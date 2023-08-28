using System;
using System.IO;

namespace Loka.Infrastructure.Repositories
{
    public class Photo
    {
        public static IWebHostEnvironment? environment;

        public static List<string> Base64ToImage(List<string> listBase64String, string nameFolder)
        {
            DirectoryInfo directoryInfo;
            List<string> images = new List<string>();

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
                var contentType = s.Split(",")[0];
                var encode = s.Split(",")[1];

                File.WriteAllBytes(path + i.ToString(), Convert.FromBase64String(encode));

                using (var stream = File.OpenRead(path + i.ToString()))
                {
                    var formFileName = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(stream.Name))
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = contentType
                    };

                    images.Add(Path.GetFileName(stream.Name));
                }

                
            }

            return images;

        }
    }
}
