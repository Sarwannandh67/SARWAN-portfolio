import { useState } from 'react';
import styles from './GradePro.module.css';

type Calculator = 'required-marks' | 'gpa' | 'about';

const GRADE_CUTOFFS = {
  'O': 90,
  'A+': 80,
  'A': 70,
  'B+': 60,
  'B': 50,
  'C': 40,
  'F': 0
};

const GRADE_POINTS = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'F': 0
};

interface Course {
  internalMarks: number;
  grade: keyof typeof GRADE_CUTOFFS;
}

interface GPACourse {
  grade: keyof typeof GRADE_POINTS;
  credits: number;
}

export default function GradePro() {
  const [activeCalculator, setActiveCalculator] = useState<Calculator>('required-marks');
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpaCourses, setGPACourses] = useState<GPACourse[]>([]);
  const [gpaResult, setGpaResult] = useState<number>(0);
  const [requiredMarksGPA, setRequiredMarksGPA] = useState<number>(0);

  const addCourse = () => {
    setCourses([...courses, { internalMarks: 0, grade: 'O' }]);
  };

  const addGPACourse = () => {
    setGPACourses([...gpaCourses, { grade: 'O', credits: 1 }]);
  };

  const deleteCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const deleteGPACourse = (index: number) => {
    setGPACourses(gpaCourses.filter((_, i) => i !== index));
  };

  const updateCourse = (index: number, field: keyof Course, value: any) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
    calculateRequiredMarksGPA();
  };

  const calculateRequiredMarks = (internalMarks: number, grade: keyof typeof GRADE_CUTOFFS) => {
    const requiredExternal = Math.ceil((GRADE_CUTOFFS[grade] * 135 / 100) - internalMarks);
    if (requiredExternal > 75) {
      return { required40: 'Impossible', required75: 'Impossible' };
    }
    return {
      required40: `${Math.ceil((requiredExternal / 75) * 40)} / 40`,
      required75: `${requiredExternal} / 75`
    };
  };

  const calculateRequiredMarksGPA = () => {
    let totalPoints = 0;
    let totalCourses = 0;

    courses.forEach(course => {
      const marks = calculateRequiredMarks(course.internalMarks, course.grade);
      if (marks.required40 !== 'Impossible') {
        totalPoints += GRADE_POINTS[course.grade];
        totalCourses++;
      }
    });

    setRequiredMarksGPA(totalCourses > 0 ? Number((totalPoints / totalCourses).toFixed(2)) : 0);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    gpaCourses.forEach(course => {
      totalPoints += GRADE_POINTS[course.grade] * course.credits;
      totalCredits += course.credits;
    });

    setGpaResult(totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <button 
          className={`${styles.navBtn} ${activeCalculator === 'required-marks' ? styles.active : ''}`}
          onClick={() => setActiveCalculator('required-marks')}
        >
          Required Marks Calculator
        </button>
        <button 
          className={`${styles.navBtn} ${activeCalculator === 'gpa' ? styles.active : ''}`}
          onClick={() => setActiveCalculator('gpa')}
        >
          GPA Calculator
        </button>
        <button 
          className={`${styles.navBtn} ${activeCalculator === 'about' ? styles.active : ''}`}
          onClick={() => setActiveCalculator('about')}
        >
          About
        </button>
      </div>

      {activeCalculator === 'required-marks' && (
        <div className={styles.calculatorContainer}>
          <h1 className={styles.title}>Required Marks Calculator</h1>
          <div className={styles.display}>
            <span className={styles.cgpaValue}>{requiredMarksGPA}</span>
            <span className={styles.cgpaLabel}>Overall GPA</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S No</th>
                <th>Internal Marks</th>
                <th>Grade</th>
                <th>Required (40)</th>
                <th>Converted (75)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => {
                const marks = calculateRequiredMarks(course.internalMarks, course.grade);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="60"
                        step="0.1"
                        className={styles.inputField}
                        value={course.internalMarks}
                        onChange={(e) => updateCourse(index, 'internalMarks', Number(e.target.value))}
                      />
                    </td>
                    <td>
                      <select
                        className={styles.gradeSelect}
                        value={course.grade}
                        onChange={(e) => updateCourse(index, 'grade', e.target.value as keyof typeof GRADE_CUTOFFS)}
                      >
                        {Object.keys(GRADE_CUTOFFS).map((grade) => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </td>
                    <td>{marks.required40}</td>
                    <td>{marks.required75}</td>
                    <td>
                      <button className={styles.deleteBtn} onClick={() => deleteCourse(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
          <button className={styles.addCourse} onClick={addCourse}>
            + Add Course
          </button>
        </div>
      )}

      {activeCalculator === 'gpa' && (
        <div className={styles.calculatorContainer}>
          <h1 className={styles.title}>GPA Calculator</h1>
          <div className={styles.display}>
            <span className={styles.cgpaValue}>{gpaResult}</span>
            <span className={styles.cgpaLabel}>CGPA</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Grade</th>
                <th>Credits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gpaCourses.map((course, index) => (
                <tr key={index}>
                  <td>
                    <select
                      className={styles.gradeSelect}
                      value={course.grade}
                      onChange={(e) => {
                        const newCourses = [...gpaCourses];
                        newCourses[index] = { ...course, grade: e.target.value as keyof typeof GRADE_POINTS };
                        setGPACourses(newCourses);
                      }}
                    >
                      {Object.keys(GRADE_POINTS).map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="1"
                      className={styles.inputField}
                      value={course.credits}
                      onChange={(e) => {
                        const newCourses = [...gpaCourses];
                        newCourses[index] = { ...course, credits: Number(e.target.value) };
                        setGPACourses(newCourses);
                      }}
                    />
                  </td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => deleteGPACourse(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className={styles.addCourse} onClick={addGPACourse}>
              + Add Course
            </button>
            <button className={styles.calculateBtn} onClick={calculateGPA}>
              Calculate GPA
            </button>
          </div>
        </div>
      )}

      {activeCalculator === 'about' && (
        <div className={styles.calculatorContainer}>
          <h1 className={styles.title}>About GradePro for SRM</h1>
          <div className={styles.display}>
            <span className={styles.cgpaValue}>GradePro</span>
            <span className={styles.cgpaLabel}>for SRM University</span>
          </div>
          <div className={styles.aboutContent}>
            <p>GradePro is a specialized calculator designed for SRM University students to help with academic planning and grade calculations.</p>
            
            <p><strong>Features:</strong></p>
            <ul>
              <li>Calculate required marks needed to achieve desired grades</li>
              <li>Compute GPA based on course grades and credits</li>
              <li>Instantly see your potential overall GPA</li>
            </ul>
            
            <p><strong>How to use:</strong></p>
            <p>Simply add your courses, input your internal marks, select your target grades, and the calculator will show you what marks you need to achieve in your exams.</p>
            
            <p>For any suggestions or feedback, please contact on instagram <a href="https://www.instagram.com/sarwannandh/" target="_blank" rel="noopener noreferrer">@sarwannandh</a></p>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <p>Made with ❤️ by <a href="https://www.instagram.com/sarwannandh/" target="_blank" rel="noopener noreferrer">@sarwannandh</a></p>
      </div>
    </div>
  );
} 