using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Data;

public class UploadFilesManager
{
    public static string UploadFile(HttpPostedFile fileUpload, string fileName, HttpContext context, string uploadId)
    {
      var uploadPath = context.Server.MapPath("~/IMAGES_TEMP");

        var fileId = Guid.NewGuid().ToString();

        using (
            var fs = new FileStream(Path.Combine(uploadPath, fileId), FileMode.Create))
        {
            var buffer = new byte[fileUpload.InputStream.Length];
            fileUpload.InputStream.Read(buffer, 0, buffer.Length);

            fs.Write(buffer, 0, buffer.Length);
        }


        /* ----Insert into DB ---- */
        
        /* ----------------------- */

        return fileId;
    }
}