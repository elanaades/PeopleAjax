using AJAX.Data;
using April_24_Homework_AJAX.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;


namespace April_24_Homework_AJAX.Web.Controllers
{
    public class HomeController : Controller
    {

        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=People;Integrated Security=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(person);
        }

        public IActionResult GetPersonById(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            var person = repo.GetPersonById(id);
            return Json(person);
        }

        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(id);
        }
    }
}