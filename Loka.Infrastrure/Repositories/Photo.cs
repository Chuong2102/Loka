using System;
using System.IO;
using System.Web;
using System.Drawing;

namespace Loka.Infrastructure.Repositories
{
    public class Photo
    {
        public static IWebHostEnvironment? environment;
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

        public static List<IFormFile> Base64ToImage(List<string> listBase64String, string nameFolder)
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

        public async static void Save(List<IFormFile> photos)
        {
            foreach(var file in photos)
            {
                FileStream fileStream = System.IO.File.Create(environment.WebRootPath + "\\Images\\" + file.FileName);
                await file.CopyToAsync(fileStream);
                fileStream.Flush();
            }
        }
        public static void Save(List<string> listBase64String, string folderName)
        {
            //string example = "data:image/png;base64,abcdefghijklmnopqrstuvwxyz0123456789";
            int i = 0;
            foreach (string s in listBase64String)
            {
                string filePath = CreateFolder(folderName) + i.ToString() + "." + GetExtensionFromBase64(s);
                File.WriteAllBytes(filePath, Convert.FromBase64String(GetBase64String(s)));
                i++;
            }
        }
    }
}
