import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Alert, Modal, Button, ButtonBase, Typography, Container, Box, Grid, Divider, Stack, Chip, Card, Backdrop, CircularProgress, TextField } from '@mui/material';
import Page404Image from "../../images/illustration_404.svg";
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import BasicTabs from './CustomTabPanel';

import './People.css';
import OutlinedInput from '@mui/material/OutlinedInput';
// import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
// ----------------------------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
//Body - userbanner...
const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  width: '1800px',
  minHeight: '20vh',
  display: 'flex',
  justifyContent: 'left',
  flexDirection: 'column',
  paddingTop: '25px',
  paddingLeft: '10px'

}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ----------------------------------------------------------------------


const People = () => {
  const people = useStoreState((state) => state.people);
  const getPeople = useStoreActions(actions => actions.people.getPeople);
  //const { getSearchData, setSearchData } = useStoreActions(actions => actions.searchTable);

  const [person, setPerson] = useState([]);
  const queryClient = new QueryClient();
  const setPeople = useStoreActions(actions => actions.people.setPeople);
  const [loading, setLoading] = useState(true);

  const commonStyles = {
    bgcolor: 'background.paper',
    border: 1,
    m: 1,
    borderColor: 'text.primary',
    width: '5rem',
    height: '5rem',
  };
  const userInfo = people;
  useEffect(() => {
    try {
      getPeople({ accessToken: 'test' })
        .then(result => {
          if (result === '') {
            setLoading(false);
          }
          else {
            setPerson(result);
            setLoading(false);
          }
        });
    } catch (ex) {
      alert('fail');
      setLoading(false);
    }
  }, [people]);

  function PeopleHeader() {
    const classes = "";
    const [NPNIdEdit, setNPNIdEdit] = useState(false);
    const handleNPNIdEdit = () => setNPNIdEdit(true);
    const handleNPNIdCancel = () => setNPNIdEdit(false);
    const [NPNId, setNPNId] = useState(person?.npnId || "");
    const [viewSSN, setViewSSN] = useState(false);
    const handleAllowViewSSN = () => setViewSSN(!viewSSN);

    const handleNPNIdSave = async () => {
      /*Call Save person API endpoint*/
      await fetch(`/api/Person/UpdateNPNNumber?npn=${NPNId}&id=${person.pilotId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(response => response.json())
        .then(data => {
          setNPNId(NPNId);

        })
        .catch(error => console.error('Error updating NPNId:', error));
      setNPNIdEdit(false);
    }

    return (
      <div style={{ maxWidth: "100%", paddingTop: "12px" }} sx={{ textAlign: 'left', alignItems: 'top', marginLeft: '-4%', marginTop: '10px' }}>
        {typeof (person) === 'undefined' || person === null ? (
          <>
            <div>
              <Alert severity="info" sx={{ fontSize: "15px" }}>
                No record was found.
              </Alert>
            </div>
          </>
        )
          :
          (
            <div>
              <table>
                <thead></thead>
                <tr>
                  <td> <div class="container1" style={{ backgroundImage: `url("/UserBanner.png")` }}>
                    <div class="text">{person.firstName} {person.lastName}</div>
                    <div class="bottom-right">{person.pilotId} </div>
                  </div></td>
                  <td>  <CheckIcon style={{ position: "relative", top: "39px", textDecorationThickness: "120px", color: "green", fontWeight: "bold" }} />
                    <div className="center" style={{ fontWeight: "bold", color: '#8a2432', position: "relative", left: "5%", alignItems: 'center' }}>
                      <FormGrid item xs={12}>
                        <FormLabel htmlFor="email" >
                          {person.email}
                        </FormLabel>
                        <FormGrid item xs={12}>
                          <FormLabel htmlFor="phone">
                            {person.phoneNumber}
                          </FormLabel>
                        </FormGrid>
                        <FormGrid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <FormLabel htmlFor="address">
                            {person.address}
                          </FormLabel>
                        </FormGrid>
                      </FormGrid>
                    </div>
                  </td>
                  <td>

                    <div class="verticalLine"></div>
                  </td>
                  <td>
                    <table>

                      <tr>
                        <td>
                          <Typography variant="h6" gutterBottom>
                            Details
                          </Typography>
                        </td>
                        <td>SSN:
                          <TextField
                            disabled
                            id="outlined-disabled"
                            value={viewSSN && person.ssn || 'XXXX-XXX-XXXX'}
                            variant="standard"
                            defaultValue="xxxx"
                          />
                        </td>
                        <td>
                          {person.viewSSN &&
                            <Button
                              sx={{ boxShadow: 2 }}
                              style={{
                                borderRadius: 35,
                                backgroundColor: "#32688E",
                                padding: "8px 16px",
                                fontSize: "12px"
                              }}
                              variant="contained"
                              onClick={handleAllowViewSSN}>
                              {!viewSSN ? 'View SSN' : 'Hide SSN'}
                            </Button>
                          }
                        </td>
                      </tr>
                      {/* <tr colspan="3" class="horizontalLine">
                        <div class="horizontalLine"></div>
                      </tr> */}


                      {/* <Box sx={{ display: 'flex', justifyContent: 'left' }}> */}
                      {/* <Box sx={{ borderColor: 'none', paddingRight: '1%' }} > */}

                      {NPNIdEdit ?
                        <>
                          <tr>
                            <TextField
                              InputProps={{ sx: { borderRadius: 10 } }}
                              id="outlined-required"
                              label="Required"
                              // default={person.npnId}
                              value={NPNId || ""}
                              onChange={(event) => setNPNId(event.target.value)}
                            />
                            <SaveIcon onClick={() => handleNPNIdSave()}></SaveIcon>
                          </tr>
                          <tr>
                            <CloseIcon onClick={handleNPNIdCancel}></CloseIcon>
                          </tr>
                        </>
                        :
                        <>

                          <td>
                            NPN ID :  {NPNId}
                          </td>
                          <td>
                            <Box sx={{ borderColor: 'none', paddingRight: '3%' }} >
                              <EditRoundedIcon onClick={handleNPNIdEdit} />
                            </Box>
                          </td>

                        </>
                      }
                      {/* </Box> */}




                      {/* </Box> */}

                      <tr>
                        <Box sx={{ borderColor: 'none', paddingRight: '3%' }} >
                          Status {person.status}
                        </Box>
                      </tr> <tr>
                        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                          <Box sx={{ borderColor: 'none', paddingRight: '9%' }} >CE Credits: {person.ceCredit}</Box>
                          <Box sx={{ borderColor: 'none', paddingRight: '3%' }} >CE Availability: {person.availability}</Box>
                        </Box>

                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
              <div style={{ paddingTop: '25px' }}></div>
              <BasicTabs {...person} />

            </div>
          )
        }

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title> People Search | Pilot Insider App </title>
      </Helmet>
      <Container>
        <StyledContent sx={{ textAlign: 'left', alignItems: 'top', marginLeft: '-4%' }}>
          {/* <Typography variant="h5" paragraph color={'#8a2432'} >
            username : {person.name}
          </Typography> */}
          <QueryClientProvider client={queryClient}>
            <PeopleHeader />
          </QueryClientProvider>
        </StyledContent>
      </Container>
    </>
  );
}

export default People;