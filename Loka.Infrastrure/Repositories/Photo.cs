using System;
using System.IO;
using System.Web;
using System.Drawing;
using System.ComponentModel;
using Loka.Infrastructure.Repositories.EFCore;
using Loka.Infrastructure.Repositories.Dapper;
using Loka.Infrastrure.Entities;
using System.Net.Mime;

namespace Loka.Infrastructure.Repositories
{
    public class Photo
    {
        public static IWebHostEnvironment? environment;
        IEFDataContext _efContext;
        IDataContext _dapperContext;
        
        public Photo(IDataContext dataContext, IEFDataContext eFData)
        {
            this._efContext = eFData;
            this._dapperContext = dataContext;
        }

        public static string GetBase64String(string path)
        {
            var encode = path.Split(",")[1];

            return encode;
        }

        public static string CreateFolder(string folderName)
        {
            string path = environment.WebRootPath + "\\Images\\" + "\\" + folderName + "\\";

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            return path;
        }

        public static string GetExtensionFromBase64(string path)
        {
            var contentType = path.Split(",")[0];
            var encode = path.Split(",")[1];
            string extension = "";

            switch(contentType)
            {
                case "data:image/jpeg;base64":
                    extension = "jpeg";
                    break;
                case "data:image/png;base64":
                    extension = "png";
                    break;
                default://should write cases for more images types
                    extension = "jpg";
                    break;
            }

            return extension;
        }

        public string SetExtensionToBase64(string extension)
        {
            string result = "";

            switch (extension)
            {
                case "jpeg":
                    result = "data:image/jpeg;base64";
                    break;
                case "png":
                    result = "data:image/png;base64";
                    break;
                default://should write cases for more images types
                    result = "data:image/jpg;base64";
                    break;
            }

            return result;
        }

        public string GetExtesionFromFilePath(string filePath)
        {
            var name = filePath.Split('.');

            string fileExt = name[1];

            return fileExt;
        }

        public List<string> ImageToBase64(List<string> paths)
        {
            List<string> result = new List<string>();

            foreach(var path in paths)
            {
                byte[] imageArray = System.IO.File.ReadAllBytes(path);
                // decode Base64
                string base64ImageRepresentation = SetExtensionToBase64(GetExtesionFromFilePath(path)) + "," + Convert.ToBase64String(imageArray);

                result.Add(base64ImageRepresentation);
            }

            return result;

        }

        public List<IFormFile> Base64ToImage(List<string> listBase64String, string nameFolder)
        {
            DirectoryInfo directoryInfo;
            List<IFormFile> images = new List<IFormFile>();

            // When Root path is null
            if (string.IsNullOrWhiteSpace(environment.WebRootPath))
            {
                environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            string path = environment.WebRootPath + "\\Images\\";

            if (!Directory.Exists(path))
            {
                directoryInfo = Directory.CreateDirectory(path);
            }

            int i = 0;
            //
            foreach (var s in listBase64String)
            {
                var contentTypeTemp = s.Split(",")[0];
                var encode = s.Split(",")[1];

                var contentTypeTemp_1 = contentTypeTemp.Split(":")[1];
                var contentType = contentTypeTemp_1.Split(";")[0];

                //File.WriteAllBytes(path + i.ToString(), Convert.FromBase64String(encode));

                var bytes = Convert.FromBase64String(encode);
                MemoryStream stream = new MemoryStream(bytes);

                var file = new FormFile(stream, 0, stream.Length, i.ToString(), i.ToString())
                {
                    Headers = new HeaderDictionary(),
                    ContentType = contentType
                };

                images.Add(file);


            }

            return images;

        }

        public async Task<List<string>> Save(List<string> listBase64String, string folderName, Room room)
        {
            List<string> listPath = new List<string>();

            //string example = "data:image/png;base64,abcdefghijklmnopqrstuvwxyz0123456789";
            int i = 0;
            foreach (string s in listBase64String)
            {
                // Create new Folder, name folder is AddressLine1
                string filePath = CreateFolder(folderName) + i.ToString() + "." + GetExtensionFromBase64(s);
                // Write file photo to Folder
                await File.WriteAllBytesAsync(filePath, Convert.FromBase64String(GetBase64String(s)));
                // Save path into database
                await 
                _dapperContext.Photos.CreateAsync(new Infrastrure.Entities.Photo
                {
                    Path = filePath,
                    Title = folderName,
                    Description = folderName,
                    Room = room,
                    Base64String = s,
                    CreatedTime = DateTime.Now
                });

                i++;

                //
                listPath.Add(filePath);
            }

            return listPath;
        }
    }
}
