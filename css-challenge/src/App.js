import './App.css';


const exercises = [
  {
    title: "Speaking Skills",
    count: 10,
    icon: "fas fa-heart",
    color: "orange"
  },
  {
    title: "Reading Speed",
    count: 8,
    icon: "fas fa-user",
    color: "blue"
  },
  {
    title: "Speaking Skills",
    count: 10,
    icon: "fas fa-heart",
    color: "orange"
  },
  {
    title: "Reading Speed",
    count: 8,
    icon: "fas fa-user",
    color: "blue"
  },
  {
    title: "Speaking Skills",
    count: 10,
    icon: "fas fa-heart",
    color: "orange"
  },
]


const Exercise = ({exercise}) =>{
  return (
    <div className="exercise-item"> 
      <i class={exercise.icon} style={{background: exercise.color}}></i>
      <div className="exercise-text">
        <h2>{exercise.title}</h2>
        <span>{exercise.count} Exercises</span>
      </div>
      <i class="fas fa-ellipsis-h"></i>
    </div>
   )
} 


function App() {
  return (
    <div className="App">
      <div className="Container">
        
        <div className="container-header">
          <div className="left">
            <h1>Hi, Jared!</h1>
            <span className="header-date">23 Jan, 2021</span>
          </div>
          <button className="right">
            <i class="fas fa-bell"></i>
          </button>
        </div>    

        <div id="input-bar">
          <i class="fas fa-search"></i>
          <input placeholder="Search" className="search-input" type="search" />
        </div>

        <div className="feeling">
          <div className="section-header">
            <h2>How do you feel?</h2>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div className="feeling-wrapper">
            <div className="feeling-item">
              <button>
                <i>&#128547;</i>
              </button>
              <span>Badly</span>
            </div>
            <div className="feeling-item">
              <button>
                <i>&#128522;</i>
              </button>
              <span>Fine</span>
            </div>
            <div className="feeling-item">
              <button>
                <i>&#128513;</i>
              </button>
              <span>Well</span>
            </div>
            <div className="feeling-item">
              <button>
                <i>&#128515;</i>
              </button>
              <span>Excellent</span>
            </div>
          </div>
            
        </div>

        <div className="exercises">
          <div className="section-header">
            <h2>Exercises</h2>
            <i class="fas fa-ellipsis-h"></i>
          </div>

          <div className="exercise-wrapper">
            {exercises.map((exercise, index) => <Exercise exercise={exercise} key={index}/>)}
          </div>
        </div>
        
        <div className="bottom-bar">
          <ul>
            <li>
              <button className="active">
                <i class="fas fa-home"></i>
              </button> 
            </li>
            <li>
              <button>
                <i class="fas fa-th-large"></i>
              </button> 
            </li>
            <li>
              <button>
                <i class="fas fa-envelope-open"></i>
              </button> 
            </li>
            <li>
              <button>
                <i class="fas fa-user"></i>
              </button> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


export default App;
