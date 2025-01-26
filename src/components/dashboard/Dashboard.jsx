import './Dashboard.scss'
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';



function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-menu">
          <MenuIcon />
        </div>
        <div className="dashboard-header-logo">
          <img
            src="https://img.icons8.com/color/512/google-keep.png"
            alt="fundo-image"
            className="dashboard-header-img"
          />
        </div>
        <div className="dashboard-header-text">Keep</div>
      </div>
      <div className="dashboard-search-bar-container">
      <TextField
          id="filled-basic"
          placeholder="Search"
          variant="outlined"
          fullWidth
          className="dashboard-search-bar"
          InputProps={{
            startAdornment: (
              <InputAdornment 
              position="start"
              className="search-icon"
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="dashboard-user-info">

      </div>
    </div >
  )
}

export default Dashboard;

