import { Link, useLocation } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <ToggleButtonGroup exclusive value={pathname} style={{ marginTop: 10, marginBottom: 10 }}>
      <Link to="/converter" style={{ textDecoration: 'none', marginRight: 5 }}>
        <ToggleButton value="/converter" selected={pathname === "/converter"}>
          Converter
        </ToggleButton>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/rates">
        <ToggleButton value="/rates" selected={pathname === "/rates"}>
          Rates
        </ToggleButton>
      </Link>
    </ToggleButtonGroup>
  );
}