import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface FieldProps {
    name: string,
    value: string
}

export const Field = (props: FieldProps) => {
    const {name, value} = props;

    return (
        <Grid item xs = {12}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                        aria-controles='panel1-content'
                        id="panel1a-header">
                    <Typography>{name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{value}</Typography>
                </AccordionDetails>
            </Accordion>

        </Grid>
    )
}