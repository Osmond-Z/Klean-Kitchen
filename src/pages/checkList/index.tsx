import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "../../components/customer/CustomerListResults";
import CustomerListToolbar from "../../components/customer/CustomerListToolbar";
import customers from "../../__mocks__/customers";

const CheckList = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      style={{
        backgroundColor: "background.default",
        minHeight: "100%",
        padding: "3 0",
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box style={{ paddingTop: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CheckList;