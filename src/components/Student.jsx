function Student({ siswa, onEdit, onDelete}) {
    return (
        <div className="student-card">
            <div>
                <h2>{siswa.nama}</h2>
                <p>{siswa.email}</p>
                <p>Course : {siswa.kelas}</p>

                <span className={siswa.status === "Active" ? "active" : "inactive"}>
                {siswa.status}
                </span>
            </div>

            <div className="student-button">
                <button onClick={() => onEdit(siswa)}>Edit</button>
                <button onClick={() => onDelete(siswa.id)} className="delete-btn">Hapus</button>
            </div>
        </div>
    )
}

export default Student;