import { useState, useEffect } from "react";
import Student from "./components/Student";
import "./App.css";

const dataAwal = [
  { id: 1, nama: "Verra", email: "verra@gmail.com", kelas: "React JS", status: "Active" },
  { id: 2, nama: "Fira", email: "fira@gmail.com", kelas: "HTML & CSS", status: "Active" },
  { id: 3, nama: "Kayla", email: "kayla@gmail.com", kelas: "JavaScript", status: "Inactive" },
  { id: 4, nama: "Amel", email: "amel@gmail.com", kelas: "React JS", status: "Active" },
  { id: 5, nama: "Anin", email: "anin@gmail.com", kelas: "JavaScript", status: "Inactive" },
];

function App() {
  const [siswa, setSiswa] = useState(() => {
    const tersimpan = localStorage.getItem("dataSiswa");
    return tersimpan ? JSON.parse(tersimpan) : dataAwal;
  });

  const [halaman, setHalaman] = useState("Dashboard");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [status, setStatus] = useState("Active");
  const [cari, setCari] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("dataSiswa", JSON.stringify(siswa));
    document.title = "Student Management System";
  }, [siswa]);

  const aktif = siswa.filter((item) => item.status === "Active").length;
  const tidakAktif = siswa.filter((item) => item.status === "Inactive").length;

  const hasilCari = siswa.filter((item) =>
    item.nama.toLowerCase().includes(cari.toLowerCase())
  );

  function resetForm() {
    setNama("");
    setEmail("");
    setKelas("");
    setStatus("Active");
    setEditId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editId !== null) {
      setSiswa(siswa.map((item) => item.id === editId ? {...item, nama, email, kelas, status}
    : item));
    } else {
      const siswaBaru = {
        id: Date.now(), nama, email, kelas, status,
      };

      setSiswa([...siswa, siswaBaru]);
    }

    resetForm();
    setHalaman("Student");
  }

  function handleEdit(item) {
    setNama(item.nama);
    setEmail(item.email);
    setKelas(item.kelas);
    setStatus(item.status);
    setEditId(item.id);
    setHalaman("Add Student");
  }

  function handleDelete(id) {
    if (window.confirm("Yakin ingin menghapus siswa ini?")) {
      setSiswa(siswa.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="logo">SMS</div>
          <div>
            <h2>Student Management System</h2>
            <p>Manage your student efficiently</p>
          </div>
        </div>

        <span>{siswa.length} Students Registered</span>
      </header>

      <main className="container">
        <nav className="navigation">
          {["Dashboard", "Student", "Add Student"].map((menu) => (
            <button key={menu} className={halaman === menu ? "selected" : ""} onClick={() => {resetForm(); setHalaman(menu);}}>
              {menu}
            </button>
          ))}
        </nav>

        {halaman === "Dashboard" && (
          <>
            <section className="welcome">
              <div className="cap"> 🎓 </div>
              <div>
                <h1>Student Management System</h1>
                <p>Welcome back!</p>
              </div>
            </section>

            <section className="stats">
              <div className="stat-card">
                <p>Total Student</p>
                <h2>{siswa.length}</h2>
                <small>Registered students</small>
              </div>

              <div className="stat-card">
                <p>Active Student</p>
                <h2>{aktif}</h2>
                <small>Active students</small>
              </div>

              <div className="stat-card">
                <p>Inactive Student</p>
                <h2>{tidakAktif}</h2>
                <small>Need attention</small>
              </div>

              <div className="stat-card">
                <p>Total Courses</p>
                <h2>5</h2>
                <small>Availabel courses</small>
              </div>
            </section>

            <section className="quick-actions">
              <h3>Quick Actions</h3>
              <p>Common tasks you might want to perform</p>

              <div className="action-list">
                <button onClick={() => setHalaman("Student")}>
                  <strong>View All Student</strong>
                  <small>Browse and manage student record</small>
                </button>

                <button onClick={() => {
                  resetForm(); setHalaman("Add Student");
                }}>
                  <strong>Add New Student</strong>
                  <small>Register a new student</small>
                </button>

                <button onClick={() => {
                  resetForm(); setHalaman("Student");
                }}>
                  <strong>Manage Courses</strong>
                  <small>View student course information</small>
                </button>
              </div>
            </section>
          </>
        )}

        {halaman === "Student" && (
          <section className="content-card">
            <h1>Student List</h1>
            <p>Manage all registered students</p>

            <input className="search" placeholder="Search student name..." value={cari} onChange={(e) => setCari(e.target.value)}/>
            <div className="student-list">

            {hasilCari.length > 0 ? (
              hasilCari.map((item) => (
                <Student
                key={item.id} 
                siswa={item} 
                onEdit={handleEdit} 
                onDelete={handleDelete}/>
              ))
            ) : (
              <p className="empty">Student data not found.</p>
            )}
            </div>
          </section>
        )}

        {halaman === "Add Student" && (
          <section>
            <h1>{editId !== null ? "Edit Student" : "Add New Student"}</h1>
            <p>Enter Student information below</p>

            <form onSubmit={handleSubmit}>
              <label>Student Name</label>
              <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Enter student name" />

              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

              <label>Course</label>
              <input value={kelas} onChange={(e) => setKelas(e.target.value)} placeholder="Enter Course" />

              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button type="submit">{editId !== null ? "Save Changes" : "Add Student"}</button>
              <button type="submit" className="cancel-btn" onClick={() => {
                resetForm();
                setHalaman("Student");
              }}>
                Cancel
              </button>
            </form>
          </section>
        )}
      </main>

      <footer className="footer">
        <span>&copy; 2026 Student Management System.  Build with JS</span>
        <span>Total : {siswa.length} | Active {aktif} | Courses : 5</span>
      </footer>
    </div>
  )
}

export default App;