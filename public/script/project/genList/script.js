const names = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Margaret", "Christopher", "Karen", "Daniel", "Nancy", "Matthew", "Lisa", "Anthony", "Betty", "Donald", "Dorothy", "Mark", "Sandra", "Paul", "Ashley", "Steven", "Kimberly", "Andrew", "Donna", "Kenneth", "Emily", "George", "Carol", "Joshua", "Michelle", "Kevin", "Amanda", "Brian", "Melissa", "Edward", "Deborah", "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Laura", "Jeffrey", "Helen", "Ryan", "Sharon", "Jacob", "Cynthia", "Gary", "Kathleen", "Nicholas", "Amy", "Eric", "Shirley", "Stephen", "Angela", "Jonathan", "Anna", "Larry", "Ruth", "Justin", "Brenda", "Scott", "Pamela", "Brandon", "Nicole", "Frank", "Katherine", "Benjamin", "Samantha", "Gregory", "Christine", "Raymond", "Catherine", "Samuel", "Virginia", "Patrick", "Debra", "Alexander", "Rachel", "Jack", "Janet", "Dennis", "Emma", "Jerry", "Carolyn", "Tyler", "Maria", "Aaron", "Heather", "Henry", "Diane", "Jose", "Julie", "Douglas", "Joyce", "Peter", "Evelyn", "Adam", "Joan", "Nathan", "Victoria", "Zachary", "Kelly", "Walter", "Christina", "Kyle", "Lauren", "Harold", "Frances", "Carl", "Martha", "Jeremy", "Judith", "Gerald", "Cheryl", "Keith", "Megan", "Roger", "Andrea", "Arthur", "Olivia", "Terry", "Ann", "Lawrence", "Jean", "Sean", "Alice", "Christian", "Jacqueline", "Ethan", "Hannah", "Austin", "Doris", "Joe", "Kathryn", "Albert", "Gloria", "Jesse", "Teresa", "Willie", "Sara", "Billy", "Janice", "Bryan", "Marie", "Bruce", "Julia", "Noah", "Grace", "Jordan", "Judy", "Dylan", "Theresa", "Ralph", "Madison", "Roy", "Beverly", "Alan", "Denise", "Wayne", "Marilyn", "Eugene", "Amber", "Juan", "Danielle", "Gabriel", "Rose", "Louis", "Brittany", "Russell", "Diana", "Randy", "Abigail", "Vincent", "Natalie", "Philip", "Jane", "Logan", "Lori", "Bobby", "Alexis", "Harry", "Tiffany", "Johnny", "Kayla",]

        class Student {          

            constructor() {
                function generateGrade(score) {
                    if (score < 50) return "F";
                    else if (score < 60) return "E";
                    else if (score < 70) return "D";
                    else if (score < 80) return "C";
                    else if (score < 90) return "B";
                    else return "A";
                }


                this.PossibleGrades = ["F", "E", "D", "C", "B", "A"];
                this.Name = names[Math.floor(Math.random() * names.length)];
                this.Age = Math.floor((Math.random() * 50) + 1);
                this.Score = Math.floor((Math.random() * 100) + 1);
                this.Grade = generateGrade(this.Score);;
            }


        }

        class Statistics {

            constructor(students) {
                this.grades = [0, 0, 0, 0, 0, 0];
                this.total = 0;
                this.passed = 0;
                students.forEach(student => {
                    this.grades[student.PossibleGrades.indexOf(student.Grade)]++;
                    this.total++;
                    if (student.Score >= 50) {
                        this.passed++;
                    }
                });
            }

            render() {
                let table = document.getElementById("statisticTable");

                document.getElementById("gradeMeter").setAttribute("value", "100");
                document.getElementById("gradeMeter").setAttribute("style", `--A: ${(100 * this.grades[5] / this.total).toString()}%; --B: ${(100 * this.grades[4] / this.total).toString()}%; --C: ${(100 * this.grades[3] / this.total).toString()}%; --D: ${(100 * this.grades[2] / this.total).toString()}%; --E: ${(100 * this.grades[1] / this.total).toString()}%; --F: ${(100 * this.grades[0] / this.total).toString()}%;`);
                
                for (let i = 0; i < table.rows.length; i++) {
                    let row = table.rows[i];
                    
                    console.log(row.cells[0]);

                    switch(row.cells[0].innerHTML){
                        case "Passed":
                            console.log("yes");
                            row.cells[1].innerHTML = (100 * this.passed / this.total).toString() + "%";
                            break;
                        case "A":
                            row.cells[1].innerHTML = (100 * this.grades[5] / this.total).toString() + "%";
                            break;
                        case "B":
                            row.cells[1].innerHTML = (100 * this.grades[4] / this.total).toString() + "%";
                            break;
                        case "C":
                            row.cells[1].innerHTML = (100 * this.grades[3] / this.total).toString() + "%";
                            break;
                        case "D":
                            row.cells[1].innerHTML = (100 * this.grades[2] / this.total).toString() + "%";
                            break;
                        case "E":
                            row.cells[1].innerHTML = (100 * this.grades[1] / this.total).toString() + "%";
                            break;
                    }
                }
            }
        }


        function getGrades() {
            const input = document.getElementById("studentCount").value;

            if (input == null) {
                alert("student count not set");
            }
            
            let students = [];
            
            for(let i = 0; i < input; i++) {
                let student = new Student();
                students.push(student);
            }

            renderStudentTable(students);
            let statistics = new Statistics(students);
            statistics.render();
        }

        function renderStudentTable(students) {
            students.forEach(student => {
                const background = ["#f00", "#f60", "#fc0", "#cf0", "#6f0", "#0f0"]
                let table = document.getElementById("dataTable");

                let row = table.insertRow(-1);
                    row.style.backgroundColor = background[student.PossibleGrades.indexOf(student.Grade)];
                let nameCell = row.insertCell(-1);
                    nameCell.innerHTML = student.Name;
                let ageCell = row.insertCell(-1);
                    ageCell.innerHTML = student.Age;
                let gradeCell = row.insertCell(-1);
                    gradeCell.innerHTML = student.Grade;
                let scoreCell = row.insertCell(-1);
                    scoreCell.innerHTML = student.Score;

                
            });
        }

        function sortAge(order) {
            let table = document.getElementById("dataTable");
            let switching = true;

            while (switching) {
                switching = false;
                rows = table.rows;

                for (let i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                        break;
                    }
                }
            }
        }