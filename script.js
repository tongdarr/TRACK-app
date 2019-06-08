function addRoadForm() {
  $("#modal-add-road").css("display", "flex");
}

function deleteRoadForm() {
  $("#modal-delete-road").css("display", "flex");
}

function addProjectForm() {
  $("#modal-add-project").css("display", "flex");
}

function deleteProjectForm() {
  $("#modal-delete-project").css("display", "flex");
}

function searchForm() {
  $("#modal-search").css("display", "flex");
}

function addProblemForm() {
  $("#modal-add-problem").css("display", "flex");
}

function addWorkForm() {
  $("#modal-add-work").css("display", "flex");
}

function commentForm() {
  $("#modal-comment").css("display", "flex");
}

function modifyProjectForm() {
  $("#modal-modify-project").css("display", "flex");
}

function editSubcontractorForm() {
  $("#modal-modify-subcontractor").css("display", "flex");
}

function archiveForm() {
  $("#modal-archive-project").css("display", "flex");
}

function signupForm() {
  document.getElementById("signupForm").style.display = "block";
}

function closeLoginForm() {
  $("#modal-login").css({
    visibility: "hidden",
    opacity: "0"
  });
}

function loginForm() {
  $("#modal-login").css({
    visibility: "visible",
    opacity: "1"
  });
}

/* Change form to sign up */
function signupAlternate() {
  $(".username").val("");
  $(".password").val("");
  $(".login-form").css("display", "none");
  $(".signup-title").css("box-shadow", "0px 3px 8px -1px rgb(180,180,180)");

  $(".signup-form").css("display", "block");
  $(".login-title").css("box-shadow", "0px 3px 8px -1px rgba(0,0,0, 0.9)");
}

/* Change form to login */
function loginAlternate() {
  $(".username").val("");
  $(".password").val("");
  $(".login-form").css("display", "block");
  $(".signup-title").css("box-shadow", "0px 3px 8px -1px rgba(0,0,0, 0.9)");

  $(".signup-form").css("display", "none");
  $(".login-title").css("box-shadow", "0px 3px 8px -1px rgb(180,180,180)");
}

/***************************************************************************************/
$(document).ready(function(e) {
  // prevent the page from refreshing when button is clicked for login
  $("#login-btn").click(function(event) {
    event.preventDefault();
  });  
  
  // used to show the information when clicked
  $(document).on('click', '.road-title', function () {
    $(this).siblings('.modal-road').css("display", "flex");
    $(this).siblings('.modal-road').children().children('.roadinfo').css("display", "block");
  });

  $(document).on('click', '.project-title', function () {
    $(this).siblings('.modal-project').css("display", "flex");
    $(this).siblings('.modal-project').children().children('.projectinfo').css("display", "block");
  });

  // handles changing css when logout button is clicked
  $("#logout-btn").click(function(event) {
    $("#information-display, .header, .sidebar, .title").fadeOut(function(){
      $(".outer_container").removeClass("active_mainpage");
      $("#initial-page, .title").fadeIn();
      $('.content').removeClass('background');
      $("#project-display").css("display", "none");
      $("#road-display").css("display", "none");
      $(".header h1").text("");
      $(".sidebar").css("display", "none");
      $("html, body").css("overflow", "hidden");
      $("#logout-btn").css("display", "none");
    });
  }); 

  /* closes the modal transition */
  $(document).on('click', '.cancel-btn', function (){
    $(this).parents("#modal-add-road").css("display", "none");
    $(this).parents("#modal-add-project").css("display", "none");
    $(this).parents("#modal-delete-road").css("display", "none");
    $(this).parents("#modal-delete-project").css("display", "none");
    $(this).parents("#modal-archive-project").css("display", "none");
    $(this).parents("#modal-search").css("display", "none");
    $(this).parents("#modal-comment").css("display", "none");
    $(this).parents("#modal-add-problem").css("display", "none");
    $(this).parents("#modal-add-work").css("display", "none");
    $(this).parents("#modal-modify-project").css("display", "none");
    $(this).parents("#modal-modify-subcontractor").css("display", "none");
    $(this).parents(".modal-road").css("display", "none");
    $(this).parents(".modal-project").css("display", "none");
    $(".id").val("");
    $(".code").val("");
    $(".type").val("");
    $(".section").val("");
    $(".location").val("");
    $(".gps").val("");
    $(".roadid").val("");
    $(".name").val("");
    $(".status").val("");
    $(".startdate").val("");
    $(".enddate").val("");
    $(".contractor").val("");
    $(".author").val("");
    $(".problem").val("");
    $(".type").val("");
    $(".subcontractor").val("");
    $(".workstatus").val("");
    $("#road-project-select").val("");
    $("#selectedRoadOption").val("");
    $("#selectedProjectOption").val("");
    $("#search").val("");
  });
 
});

/***************************************************************************************/
//start of angular controller
var app = angular.module('app', []);
app.controller("ctrl", function($scope, $http){
  var id;
  var username;
  var password;
  $scope.roads = [];
  $scope.projects = [];
  $scope.archive_projects = [];
  $scope.title;
  $scope.logged_in;

  $scope.roadOptions = ['ID', 'Code', 'Type', 'Section', 'Location', 'GPS'];
  $scope.projectOptions = ['ID', 'Road ID', 'Name', 'Status', 'Contractor'];

  $scope.checkLogin=function(){
    $http({method: 'GET', url: 'https://track.sim.vuw.ac.nz/api/tongdarr/user_list.json'})
      .success(function(data, status) {
        var users = data.Users;
        for(var user of users){
          id = user.ID;
          username = user.LoginName;
          password = user.Password;
          $scope.usertype = user.UserType; 
          if($scope.login_username == username && $scope.login_password == password){
            switch($scope.usertype) {
              case "inspector":
                $scope.inspector_sidebar = true;
                $scope.manager_sidebar = false;
                $scope.contractor_sidebar = false;
                break;
              case "manager":
                $scope.inspector_sidebar = false;
                $scope.manager_sidebar = true;
                $scope.contractor_sidebar = false;
                break;
              case "contractor":
                $scope.inspector_sidebar = false;
                $scope.manager_sidebar = false;
                $scope.contractor_sidebar = true;
                break;
            }
            
            $scope.confirmation = "Login Successful";
            $("#login-confirmation").slideDown("slow");
            $("#login-confirmation").css("display", "flex");
            setTimeout(function() {
              closeLoginForm();
              $("#login-confirmation").slideUp("slow");

              $("#initial-page").fadeOut(function(){
                $('.content').toggleClass('background');
                $('.content').toggleClass('.content-fontSize');
                $(".sidebar").css("display", "inline-block");
                $(".outer_container").toggleClass("active_mainpage");
                $("#information-display, .header, .sidebar").fadeIn();
                $("html, body").css("overflow", "visible");
                $("#logout-btn").css("display", "block");
                $scope.login_username = "";
                $scope.login_password = null;
                $(".username").val("");
                $(".password").val("");

              });
            }, 1000);
            break;
          }
          else{
            $scope.confirmation = "Incorrect Username or Password"
            $("#login-confirmation").slideDown("slow");
            $("#login-confirmation").css("display", "flex");
            setTimeout(function() {
              $("#login-confirmation").slideUp("slow");
            }, 3000);
          }
        }
      })
      .error(function(data, status) {
        console.log("failed request")
    });
  };


  $scope.fillLoginForm=function(string){
    switch(string) {
      case "inspector":
        $scope.login_username = "bloggsjoe";
        $scope.login_password = 1234;
        $(".username").val("bloggsjoe");
        $(".password").val("1234");
        break;
      case "manager":
        $scope.login_username = "greenpa";
        $scope.login_password = 1234;
        $(".username").val("greenpa");
        $(".password").val("1234");        
        break;
      case "contractor":
        $scope.login_username = "jonesto";
        $scope.login_password = 1234;
        $(".username").val("jonesto");
        $(".password").val("1234");           
        break;
    }
  }
  /***************************************************************************************/
  // GET functions
  $scope.getRoads = function() {
    $http({method: 'GET', url: 'https://track.sim.vuw.ac.nz/api/tongdarr/road_dir.json'})
      .success(function(data, status) {
        $scope.roads = data.Roads;
        $(".header h1").text("Roads");
        $("#project-display").css("display", "none");
        $("#road-display").css("display", "block");
      })
      .error(function(data, status) {
        console.log("failed request");
      });
  };

  $scope.getProjects = function() {
    // if its the contractor, show the projects that match the username of the contractor
    if($scope.contractor_sidebar) {
      $http({method: 'GET', url: 'https://track.sim.vuw.ac.nz/api/tongdarr/project_dir.json'})
        .success(function(data, status) {
          var tempProjects = [];
          for(var project of data.Projects) {
            if(project.Contractor == username) {
              tempProjects.push(project);
            }
          }
          $scope.projects = tempProjects;
          $(".header h1").text("Projects");
          $("#project-display").css("display", "block");
          $("#road-display").css("display", "none");
        })
        .error(function(data, status) {
          console.log("failed request");
        });
    }
    else {
      $http({method: 'GET', url: 'https://track.sim.vuw.ac.nz/api/tongdarr/project_dir.json'})
        .success(function(data, status) {
          $scope.projects = data.Projects;
          $(".header h1").text("Projects");
          $("#project-display").css("display", "block");
          $("#road-display").css("display", "none");
        })
        .error(function(data, status) {
          console.log("failed request");
        });
    }
  };

  $scope.getArchivedProjects = function() {
    $scope.projects = $scope.archive_projects;
    $(".header h1").text("Archived Projects");
  };

  /***************************************************************************************/
  // POST functions
  $scope.addRoad = function() {
    var id = $scope.id;
    var code = $scope.code;
    var type = $scope.type;
    var section = $scope.section;
    var location = $scope.location;
    var gps = $scope.gps;
    if (id == null) {
      return;
    }
    if (
      code == null ||
      type == null ||
      section == null ||
      location == null ||
      gps == null
    ) {
      alert("Please Enter Valid Inputs");
      return;
    }
    var parameter = JSON.stringify({
      ID: id,
      Code: code,
      Type: type,
      Section: section,
      Location: location,
      GPS: gps
    });
    var url = "https://track.sim.vuw.ac.nz/api/tongdarr/update.road.json";
    $http
      .post(url, parameter)
      .success(function(data, status) {
        alert("Road has been added");
        console.log("successful update");
        $(this)
          .parents("#modal-add-road")
          .css("display", "none");
        $scope.id = "";
        $scope.code = "";
        $scope.type = "";
        $scope.section = "";
        $scope.location = "";
        $scope.gps = "";

        // Update the roads in real-time
        $scope.getRoads();
      })
      .error(function(data, status) {
        alert("Failed to add road");
        console.log("failed request");
      });
  };

  $scope.addProject = function() {
    var id = $scope.id;
    var roadid = $scope.roadid;
    var name = $scope.name;
    var status = $scope.status;
    var startdate = $scope.startdate;
    var enddate = $scope.enddate;
    var contractor = $scope.contractor; 

    if (id == null) {
      return;
    }
    if (
      roadid == null ||
      name == null ||
      status == null ||
      startdate == null ||
      enddate == null ||
      contractor == null
    ) {
      alert("Please Enter Valid Inputs");
      return;
    }
    var parameter = JSON.stringify({
      ID: id,
      Road: roadid,
      Name: name,
      Status: status,
      StartDate: startdate,
      EndDate: enddate,
      Contractor: contractor,
      Problems: [],
      Works: [],
      Comments: []
    });
    var url = "https://track.sim.vuw.ac.nz/api/tongdarr/update.project.json";
    $http
      .post(url, parameter)
      .success(function(data, status) {
        alert("Project has been added");
        console.log("successful update");
        $(this).parents("#modal-add-project").css("display", "none");
        $scope.id = "";
        $scope.roadid = "";
        $scope.name = "";
        $scope.status = "";
        $scope.startdate = "";
        $scope.enddate = "";
        $scope.contractor = ""; 

        // Update the roads in real-time
        $scope.getProjects();
      })
      .error(function(data, status) {
        alert("Failed to add project");
        console.log("failed request");
      });
  };


  $scope.archiveProject = async function() {

    await $http({method: 'GET', url: 'https://track.sim.vuw.ac.nz/api/tongdarr/project.' + $scope.id + '.json'})
      .success(function(data, status) {
        $scope.archive_projects.push(data);
        $(".header h1").text("Projects");
        $("#project-display").css("display", "block");
        $("#road-display").css("display", "none");
      })
      .error(function(data, status) {
        console.log("failed request");
      });

    // var id = $scope.id;
    if ($scope.id == null) {
      alert("Please enter a valid id");
      return;
    }
    var parameter = JSON.stringify({
      ID: $scope.id
    });
    var url =
      "https://track.sim.vuw.ac.nz/api/tongdarr/delete.project." +
      $scope.id +
      ".json";
    $http
      .delete(url, parameter)
      .success(function(data, status) {
        alert("Project has been deleted and archived");
        console.log("successful update");
        $(this)
          .parents("#modal-archive-project")
          .css("display", "none");
        $scope.id = "";
      })
      .error(function(data, status) {
        alert("Failed to delete project");
        console.log("failed request");
      });
  };

  /***************************************************************************************/
  // DELETE functions
  //delete road function for server
  $scope.deleteRoad = function() {
    var id = $scope.id;
    if (id == null) {
      alert("Please enter a valid id");
      return;
    }
    var parameter = JSON.stringify({
      ID: id
    });
    var url =
      "https://track.sim.vuw.ac.nz/api/tongdarr/delete.road." + id + ".json";
    $http
      .delete(url, parameter)
      .success(function(data, status) {
        alert("Road has been deleted");
        console.log("successful update");
        $(this)
          .parents("#modal-delete-road")
          .css("display", "none");
        $scope.id = "";
      
      // Update the roads in real-time
        $scope.getRoads();
      })
      .error(function(data, status) {
        alert("Failed to delete road");
        console.log("failed request");
      });
  };

  // delete road function for server
  $scope.deleteProject = function() {
    var id = $scope.id;
    if (id == null) {
      alert("Please enter a valid id");
      return;
    }
    var parameter = JSON.stringify({
      ID: id
    });
    var url =
      "https://track.sim.vuw.ac.nz/api/tongdarr/delete.project." +
      id +
      ".json";
    $http
      .delete(url, parameter)
      .success(function(data, status) {
        alert("Project has been deleted");
        console.log("successful update");
        $(this)
          .parents("#modal-delete-project")
          .css("display", "none");
        $scope.id = "";
      
      // Update the projects in real-time
        $scope.getProjects();
      })
      .error(function(data, status) {
        alert("Failed to delete project");
        console.log("failed request");
      });
  };

  /***************************************************************************************/
  // call get roads then filter results in roads array based on search dropdown input
  $scope.searchForm = function() {
    // The selected type of data
    var typeOfData = $("#road-project-select option:selected").text();
    if(typeOfData === 'Road') {
      $http({method: 'GET', url: 'https://track.sim.vuw.ac.nz/api/tongdarr/road_dir.json'})
      .success(function(data, status) {
        var roads = data.Roads;
        var tempRoads = [];
        var selectedRoadOption = $("#selectedRoadOption option:selected").text();
        $("#project-display").css("display", "none");
        $("#road-display").css("display", "block");
        $scope.title = 'Roads';
        for(var road of roads) {
          switch (selectedRoadOption) {
            case 'ID':
              if(road.ID === $scope.search) {
                tempRoads.push(road);
              }
              break;
            case 'Code':
              if(road.Code === $scope.search) {
                tempRoads.push(road);
              }            
              break;
            case 'Type':
              if(road.Type === $scope.search) {
                tempRoads.push(road);
              }          
              break;
            case 'Section':
              if(road.Section === $scope.search) {
                tempRoads.push(road);
              }          
              break;
            case 'Location':
              if(road.Location === $scope.search) {
                tempRoads.push(road);
              }          
              break;
            case 'GPS':
              if(road.GPS === $scope.search) {
                tempRoads.push(road);
              }          
              break;            
          }
        }
        $scope.roads = tempRoads;
        $scope.search = "";
      })
      .error(function(data, status) {
        alert("Failed to search road");
        console.log("failed request");
      });
    } else if(typeOfData === 'Project') {
      $http({method: 'GET', url: 'https://track.sim.vuw.ac.nz/api/tongdarr/project_dir.json'})
      .success(function(data, status) {
        var projects = data.Projects;
        var tempProjects = [];
        var selectedProjectOption = $("#selectedProjectOption option:selected").text();
        $("#road-display").css("display", "none");
        $("#project-display").css("display", "block");
        $scope.title = 'Projects';
        for(var project of projects) {
          switch (selectedProjectOption) {
            case 'ID':
              if(project.ID === $scope.search) {
                tempProjects.push(project);
              }
              break;
            case 'Code':
              if(project.Road === $scope.search) {
                tempProjects.push(project);
              }            
              break;
            case 'Type':
              if(project.Name === $scope.search) {
                tempProjects.push(project);
              }          
              break;
            case 'Section':
              if(project.Status === $scope.search) {
                tempProjects.push(project);
              }          
              break;
            case 'Location':
              if(project.Contractor === $scope.search) {
                tempProjects.push(project);
              }          
              break;         
          }
        }
        $scope.projects = tempProjects;
      })
      .error(function(data, status) {
        alert("Failed to search project");
        console.log("failed request");
      });
    }
  };

  $scope.commentForm = async function() {
    var id = $scope.id;
    var author = $scope.author;
    var comment = $scope.comment;
    
    var id;
    var roadid;
    var name;
    var status;
    var startdate;
    var enddate;
    var contractor; 
    var problems;
    var comments;
    var works;

    if (id == null) {
      return;
    }
    if (
      author == null ||
      comment == null 
    ) {
      alert("Please Enter Valid Inputs");
      return;
    }
    
    await $http({
      method: "GET",
      url: 'https://track.sim.vuw.ac.nz/api/tongdarr/project.' + id + '.json'
    })
      .success(function(data, statusO) { 
        console.log(data);
        id = data.ID;
        roadid = data.Road;
        name = data.Name;
        status = data.Status;
        startdate = data.StartDate;
        enddate = data.EndDate;
        contractor = data.Contractor;
        problems = data.Problems;
        comments = data.Comments;
        works = data.Works;
    })
      .error(function(data, statusO) {
        alert("Failed To Find Project ID: " + id);
        console.log("failed request");
      });
    
    comments.push({
      Author: author,
      Text: comment
    });

    
    var temp = {
      ID: id,
      Road: roadid,
      Name: name,
      Status: status,
      StartDate: startdate,
      EndDate: enddate,
      Contractor: contractor,
      Problems: problems,
      Comments: comments,
      Works: works
    };
    
    var parameter = JSON.stringify(temp);
    
    var url2 = "https://track.sim.vuw.ac.nz/api/tongdarr/update.project.json";
    await $http
      .post(url2, parameter)
      .success(function(data, status) {
        alert("Comment has been added");
        $(this).parents("#modal-add-comment").css("display", "none");
        $scope.id = "";
        $scope.author = "";
        $scope.comment = "";
      })
      .error(function(data, status) {
        alert("Failed to add problem");
        console.log("Failed request");
      });

    await $scope.getProjects();
  };
  
  //=======================Added Code==========================================//
  //add project problem function for server
  $scope.addProblem = async function() {
    var id = $scope.id;
    var author = $scope.author;
    var problem = $scope.problem;
    var roadid;
    var name;
    var status;
    var startdate;
    var enddate;
    var contractor;
    var problems;
    var comments;
    var works;

    if (id == null) {
      return;
    }
    if (author == null || problem == null) {
      alert("Please Enter Valid Inputs");
      return;
    }

    await $http({
      method: "GET",
      url: "https://track.sim.vuw.ac.nz/api/tongdarr/project." + id + ".json"
    })
      .success(function(data, statusO) {
        roadid = data.Road;
        name = data.Name;
        status = data.Status;
        startdate = data.StartDate;
        enddate = data.EndDate;
        contractor = data.Contractor;
        problems = data.Problems;
        comments = data.Comments;
        works = data.Works;
      })
      .error(function(data, statusO) {
        alert("Failed To Find Project ID: " + id);
        console.log("failed request");
      });

    problems.push({
      Author: author,
      Text: problem
    });

    var parameter = JSON.stringify({
      ID: id,
      Road: roadid,
      Name: name,
      Status: status,
      StartDate: startdate,
      EndDate: enddate,
      Contractor: contractor,
      Problems: problems,
      Comments: comments,
      Works: works
    });

    var url = "https://track.sim.vuw.ac.nz/api/tongdarr/update.project.json";
    await $http
      .post(url, parameter)
      .success(function(data, status) {
        alert("Problem has been added");
        $(this)
          .parents("#modal-add-problem")
          .css("display", "none");
        $scope.id = "";
        $scope.author = "";
        $scope.problem = "";
      })
      .error(function(data, status) {
        alert("Failed to add problem");
        console.log("Failed request");
      });
    
    await $scope.getProjects();
  };
  
    //add project problem function for server
  $scope.addWork = async function() {
    var id = $scope.id;
    var type = $scope.type;
    var subcontractor = $scope.subcontractor;
    var wstatus = $scope.status;
    var roadid;
    var name;
    var status;
    var startdate;
    var enddate;
    var contractor;
    var problems;
    var comments;
    var works;

    if (id == null) {
      return;
    }
    if (author == null || problem == null) {
      alert("Please Enter Valid Inputs");
      return;
    }

    await $http({
      method: "GET",
      url: "https://track.sim.vuw.ac.nz/api/tongdarr/project." + id + ".json"
    })
      .success(function(data, statusO) {
        roadid = data.Road;
        name = data.Name;
        status = data.Status;
        startdate = data.StartDate;
        enddate = data.EndDate;
        contractor = data.Contractor;
        problems = data.Problems;
        comments = data.Comments;
        works = data.Works;
      })
      .error(function(data, statusO) {
        alert("Failed To Find Project ID: " + id);
        console.log("failed request");
      });

    works.push({
      Type: type,
      SubContractors: subcontractor,
      Status: wstatus
    });

    var parameter = JSON.stringify({
      ID: id,
      Road: roadid,
      Name: name,
      Status: status,
      StartDate: startdate,
      EndDate: enddate,
      Contractor: contractor,
      Problems: problems,
      Comments: comments,
      Works: works
    });

    var url = "https://track.sim.vuw.ac.nz/api/tongdarr/update.project.json";
    await $http
      .post(url, parameter)
      .success(function(data, status) {
        alert("Work has been added");
        $(this)
          .parents("#modal-add-work")
          .css("display", "none");
        $scope.id = "";
        $scope.type = "";
        $scope.subcontractor = "";
        $scope.status = "";
      })
      .error(function(data, status) {
        alert("Failed to add work");
        console.log("Failed request");
      });
    
    await $scope.getProjects();
  };
  
  //modify project information function for server
  $scope.modifyProject = async function() {
    var id = $scope.id;
    var roadid;
    var name;
    var status = $scope.status;
    var startdate;
    var enddate = $scope.enddate;
    var contractor;
    var problems;
    var comments;
    var works;

    if (id == null) {
      return;
    }
    if (status == null || enddate == null) {
      alert("Please Enter Valid Inputs");
      return;
    }

    await $http({
      method: "GET",
      url: "https://track.sim.vuw.ac.nz/api/tongdarr/project." + id + ".json"
    })
      .success(function(data, status) {
        roadid = data.Road;
        name = data.Name;
        startdate = data.StartDate;
        contractor = data.Contractor;
        problems = data.Problems;
        comments = data.Comments;
        works = data.Works;
      })
      .error(function(data, status) {
        alert("Failed To Find Project ID: " + id);
        console.log("failed request");
      });

    var parameter = JSON.stringify({
      ID: id,
      Road: roadid,
      Name: name,
      Status: status,
      StartDate: startdate,
      EndDate: enddate,
      Contractor: contractor,
      Problems: problems,
      Comments: comments,
      Works: works
    });

    var url = "https://track.sim.vuw.ac.nz/api/tongdarr/update.project.json";
    await $http
      .post(url, parameter)
      .success(function(data, status) {
        alert("Project has been modified");
        $(this)
          .parents("#modal-modify-project")
          .css("display", "none");
        $scope.id = "";
        $scope.status = "";
        $scope.enddate = "";
      })
      .error(function(data, status) {
        alert("Failed to modify project");
        console.log("Failed request");
      });
    
    await $scope.getProjects();
  };
  
  //edit work subcontractor function for server
  $scope.modifySubcontractor = async function() {
    var id = $scope.id;
    var type = $scope.type;
    var subcontractor = $scope.subcontractor;
    var roadid;
    var name;
    var status;
    var startdate;
    var enddate;
    var contractor;
    var problems;
    var comments;
    var works;
    var update = [{Type: "",
                  SubContractor: "",
                  Status: ""}];
    var isfound = false;

    if (id == null) {
      return;
    }
    if (author == null || problem == null) {
      alert("Please Enter Valid Inputs");
      return;
    }

    await $http({ 
      method: "GET",
      url: "https://track.sim.vuw.ac.nz/api/tongdarr/project." + id + ".json"
    })
      .success(function(data, statusO) {
        roadid = data.Road;
        name = data.Name;
        status = data.Status;
        startdate = data.StartDate;
        enddate = data.EndDate;
        contractor = data.Contractor;
        problems = data.Problems;
        comments = data.Comments;
        works = data.Works;
      })
      .error(function(data, statusO) {
        alert("Failed To Find Project ID: " + id);
        console.log("failed request");
      });
    
    if(!works.length){
      alert("No Existing Works");
      return;
    }

    for(var work of works){
      var temptype = work.Type;
      var tempsubcontractor = work.SubContractor;
      var tempstatus = work.Status;
      
      if(temptype == type){
        update.push({
          Type: type,
          SubContractors: subcontractor,
          Status: tempstatus
        });
        isfound = true;
      }
      else{
        update.push({
          Type:temptype,
          SubContractors: tempsubcontractor,
          Status: tempstatus
        }); 
      }
    }
    update.shift();
    
    if(!isfound){
      alert("Work Type Not Found, Failed To Change SubContractor");
      return;
    }

    var parameter = JSON.stringify({
      ID: id,
      Road: roadid,
      Name: name,
      Status: status,
      StartDate: startdate,
      EndDate: enddate,
      Contractor: contractor,
      Problems: problems,
      Comments: comments,
      Works: update
    });

    var url = "https://track.sim.vuw.ac.nz/api/tongdarr/update.project.json";
    await $http
      .post(url, parameter)
      .success(function(data, status) {
        alert("Subcontractor Updated");
        $(this)
          .parents("#modal-modify-subcontractor")
          .css("display", "none");
        $scope.id = "";
        $scope.type = "";
        $scope.subcontractor = "";
      })
      .error(function(data, status) {
        alert("Failed to modify subcontractor");
        console.log("Failed request");
      });
    
    await $scope.getProjects();
  };
}); // end of angular controller