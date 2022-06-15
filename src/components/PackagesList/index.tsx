import React from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Typography
} from "@material-ui/core";
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';

import { Insurer } from "../../utils/types";
import packages from "../../data.json";

import useStyles from "./styles";

const PackagesList: React.FunctionComponent<
  { onSelect: (val: Insurer) => void }
> = ({ onSelect }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <List>
        {Object.keys(packages).map((el, idx) => (
          <React.Fragment key={el}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={packages[el as Insurer].name}
                secondary={
                  <>
                    <Typography
                      classes={{ root: classes.description }}
                      component="span"
                      variant="body2"
                    >
                      {packages[el as Insurer].description}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                    >
                      {`Price: ${packages[el as Insurer].price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}`}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onSelect(el as Insurer)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {idx < Object.keys(packages).length - 1 && (
              <Divider component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default PackagesList;
