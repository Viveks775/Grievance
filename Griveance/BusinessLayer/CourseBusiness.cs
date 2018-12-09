﻿using Griveance.Models;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class CourseBusiness
    {
        public object GetCourseInfo()
        {
            GRContext context = new GRContext();
            try
            {
                var courses = context.ViewGetCourseInfoes.ToList();

                if (courses == null)
                    return new Result { IsSucess = false, ResultData = "Record Not Found" };
                else
                return new Result { IsSucess = true, ResultData = courses };
            }
            catch (Exception ex)
            {
                return new Error { IsError = true, Message = ex.Message };
            }
        }
    }
}