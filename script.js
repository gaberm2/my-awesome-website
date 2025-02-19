let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function addEmployee() {
    let name = document.getElementById("name").value;
    let job = document.getElementById("job").value;
    let salary = document.getElementById("salary").value;
    let hireDate = document.getElementById("hireDate").value;

    if (name === "" || job === "" || salary === "" || hireDate === "") {
        alert("⚠️ من فضلك أدخل جميع البيانات");
        return;
    }

    let employee = { name, job, salary, hireDate, attendance: "❌ لم يحضر" };
    employees.push(employee);
    saveData();
    updateTable();
}

function updateTable() {
    let tableBody = document.querySelector("#employeeTable tbody");
    tableBody.innerHTML = "";

    let totalSalary = 0;
    let presentCount = 0;

    employees.forEach((emp, index) => {
        if (emp.attendance === "✅ حضر") presentCount++;
        totalSalary += parseInt(emp.salary);

        let row = `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.job}</td>
                <td>${emp.salary} جنيه</td>
                <td>${emp.hireDate}</td>
                <td>${emp.attendance}</td>
                <td><button onclick="deleteEmployee(${index})">🗑️ حذف</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById("totalSalary").innerText = `💰 إجمالي المرتبات: ${totalSalary} جنيه`;
}

function exportToExcel() {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(employees);
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "Employee_Report.xlsx");
}

function exportToPDF() {
    let doc = new jsPDF();
    doc.text("📄 تقرير الموظفين", 20, 20);
    employees.forEach((emp, index) => {
        doc.text(`${index + 1}. ${emp.name} - ${emp.job} - ${emp.salary} جنيه`, 20, 40 + (index * 10));
    });
    doc.save("Employee_Report.pdf");
}

updateTable();

function toggleSpaceMode() {
    document.body.classList.toggle("dark-mode");

}

function sendEmail(employee) {
    emailjs.send("service_xxx", "template_xxx", {
            to_email: "manager@example.com",
            employee_name: employee.name,
            attendance_status: employee.attendance
        }, "user_xxx")
        .then(() => {
            alert("📧 تم إرسال الإشعار بنجاح!");
        }, (error) => {
            console.log("❌ خطأ في الإرسال:", error);
        });
}

function markAttendance() {
    let name = prompt("أدخل اسم الموظف:");
    let found = false;

    employees.forEach(emp => {
        if (emp.name === name) {
            emp.attendance = "✅ حضر";
            sendEmail(emp);
            found = true;
        }
    });

    if (!found) {
        alert("❌ الموظف غير موجود!");
    }

    saveData();
    updateTable();
}