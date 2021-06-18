import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const CustomerListToolbar = (props: any) => (
  <Box {...props}>
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button>Import</Button>
      <Button style={{ margin: "0 1" }}>Export</Button>
      <Button color="primary" variant="contained">
        Add customer
      </Button>
    </Box>
    <Box style={{ marginTop: 3 }}>
      <Card>
        <CardContent>
          <Box style={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CustomerListToolbar;
