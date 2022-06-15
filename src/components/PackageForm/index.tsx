import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Send as SendIcon
} from '@mui/icons-material';

import { isValidEmail, isValidNumber } from "../../utils/validations";
import { IUser, Gender } from "../../utils/types";

import useStyles from "./styles";

interface IError {
  email?: string;
  age?: string;
  gender?: string;
}

const PackageForm: React.FunctionComponent<
  {
    onBack: () => void;
    onSubmit: (user: IUser) => void;
  }
> = ({ onBack, onSubmit }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [errors, setErrors] = useState<IError>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateFields = useCallback(() => {
    const e: IError = {};

    if (!email) {
      e.email = "This field is required.";
    } else if (!isValidEmail(email)) {
      e.email = "Please type valid email address.";
    }

    if (!age) {
      e.age = "This field is required.";
    } else if (!isValidNumber(age)) {
      e.age = "Please type valid age.";
    } else {
      const ageVal = Number(age);

      if (ageVal < 18 || ageVal > 99) {
        e.age = "Age should be between 18-99.";
      }
    }

    if (!gender) {
      e.gender = "This field is required.";
    }

    return e;
  }, [email, age, gender]);

  useEffect(() => {
    if (isSubmitted) {
      setErrors(validateFields());
    }
  }, [email, age, gender, isSubmitted, validateFields]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "age") {
      setAge(value);
    } else if (name === "gender") {
      setGender(value as Gender);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const err = validateFields();
    if (Object.keys(err).length) {
      setErrors(err);
      return false;
    }

    setErrors({});
    onSubmit({
      email,
      age: Number(age),
      gender: gender as Gender
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Typography variant="caption">
            Your information
          </Typography>

          <TextField
            type="email"
            name="email"
            label="What's your email?"
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            margin="normal"
            value={email}
            onChange={handleInputChange}
          />

          <TextField
            type="number"
            name="age"
            label="How old are you?"
            error={Boolean(errors.age)}
            helperText={errors.age}
            fullWidth
            margin="normal"
            inputProps={{
              min: 18,
              max: 99
            }}
            value={age}
            onChange={handleInputChange}
          />

          <TextField
            select
            name="gender"
            label="What is your gender?"
            error={Boolean(errors.gender)}
            helperText={errors.gender}
            fullWidth
            margin="normal"
            value={gender}
            onChange={handleInputChange}
          >
            <MenuItem value="man">Man</MenuItem>
            <MenuItem value="woman">Woman</MenuItem>
          </TextField>
        </CardContent>
        <CardActions classes={{ root: classes.buttonsContainer }}>
          <Button
            size="small"
            startIcon={<ArrowBackIosIcon />}
            onClick={onBack}
          >
            Go Back
          </Button>
          <Button
            type="submit"
            size="small"
            color="primary"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default PackageForm;
