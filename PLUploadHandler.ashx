<%@ WebHandler Language="C#" Class="PLUploadHandler" %>

using System;
using System.Web;
using System.IO;

public class PLUploadHandler : IHttpHandler
{
        public void ProcessRequest(HttpContext context)
        {
            //int chunk = context.Request["chunk"] != null ? int.Parse(context.Request["chunk"]) : 0;
            string fileName = context.Request["name"] ?? string.Empty;

            if (context.Request.Files.Count == 0)
                return;

            var uploadId = context.Request["upload_id"] ?? Guid.NewGuid().ToString();

            HttpPostedFile fileUpload = context.Request.Files[0];
            UploadFilesManager.UploadFile(fileUpload, fileName, context, uploadId);

            context.Response.ContentType = "text/plain";
            context.Response.Write(uploadId);
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }