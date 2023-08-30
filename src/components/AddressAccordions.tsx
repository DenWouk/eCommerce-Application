import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Stack, Divider } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface IAddressAccordionsProps {
  shippingAddress: IBaseAddressProfile[];
  billingAddress: IBaseAddressProfile[];
}
export default function AddressAccordions({
  shippingAddress,
  billingAddress,
}: IAddressAccordionsProps) {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Shipping Address </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {shippingAddress.map((address: IBaseAddressProfile) => (
            <Stack key={address.id}>
              <Typography>Country: {address.countryLabel}</Typography>
              <Typography>City: {address.city}</Typography>
              <Typography>
                Street: {address.streetName} #{address.streetNumber}
              </Typography>
              <Typography>Zip Code: {address.postalCode}</Typography>
              <Typography>
                {address.isDefault && (
                  <CheckRoundedIcon
                    color="success"
                    style={{ position: 'absolute', top: 60, right: 10 }}
                  />
                )}
              </Typography>
              <Divider className="m-5" />
            </Stack>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Billing Address</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {billingAddress.map((address: IBaseAddressProfile) => (
            <Stack key={address.id}>
              <Typography>Country: {address.country}</Typography>
              <Typography>City: {address.city}</Typography>
              <Typography>
                Street: {address.streetName} #{address.streetNumber}
              </Typography>
              <Typography>Zip Code: {address.postalCode}</Typography>
              <Typography>
                {address.isDefault && (
                  <CheckRoundedIcon
                    color="success"
                    style={{ position: 'absolute', top: 60, right: 10 }}
                  />
                )}
              </Typography>
              <Divider className="m-5" />
            </Stack>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
