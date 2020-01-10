import React, { useEffect } from "react";
import styled from "styled-components";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import Header from './Header';


const LabelStyle = styled.label`
`
const FieldContainer = styled.div`
  margin: 4% 0 2% 0;
  display: flex;
  flex-direction: column;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 4% 0 4% 0;
`
const BtnStyle = styled.button`
  background-color: #18181E;
  color: white;
  font-family: 'Karma', serif;
  height: 40px;
  border-color: #18181E;
  border-radius: 5px;
  width: 90px;
`

const ParaError = styled.p`
  font-size: 13px;
  margin: 6px 0 6px 8px;
  color: red;
`

// export default function LogForm({ addNewExercise }) {
const LogForm = ({ addNewExercise, values, errors, touched, status }) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  useEffect(() => {
    console.log("this is status:", status);
    status && addNewExercise(status);
    }, [status]);

  return (
    <div>
      <Header /> 
      <Form className="form-styled">
        <h3>Add New Exercise</h3>

        <div className="date-container">
          <label htmlFor="date">Date:
            <Field className="date-field"
              id="date"
              type="date"
              name="date"
            />
            {touched.date && errors.date && (
              // errors.name comes from Yup
              <ParaError>{errors.date}</ParaError>
            )}
          </label>

        </div>

        <FieldContainer> {/* This is a regular <div> */}
          {/* LabelStyle = <label> */}
          <LabelStyle htmlFor="exercise">Type of Exercise
          
            <Field className="input-styled"
              id="exercise"
              type="text"
              name="exercise"
              placeholder="Enter name of exercise"
            />

            {touched.exercise && errors.exercise && (
              <ParaError>{errors.exercise}</ParaError>
            )}

          </LabelStyle>
        </FieldContainer>

        <FieldContainer>
          <LabelStyle htmlFor="muscle">Target Muscle
            <Field className="input-styled"
              id="muscle"
              type="text"
              name="muscle"
              placeholder="Enter target muscle"       
            />

            {touched.muscle && errors.muscle && (
              <ParaError>{errors.muscle}</ParaError>
            )}
                  
          </LabelStyle>

        </FieldContainer>

        <FieldContainer>
          <LabelStyle htmlFor="sets">Number of Sets
            <Field className="input-styled"
              id="sets"
              type="number"
              name="sets"
              placeholder="Enter number of sets"
            />

            {touched.sets && errors.sets && (
              <ParaError>{errors.sets}</ParaError>
            )}        
          </LabelStyle>

        </FieldContainer>

        <FieldContainer>
          <LabelStyle htmlFor="reps">Number of Reps
            <Field className="input-styled"
              id="reps"
              type="number"
              name="reps"
              placeholder="Enter number of reps"
            />

            {touched.reps && errors.reps && (
              <ParaError>{errors.reps}</ParaError>
            )}
          
          </LabelStyle>
          
        </FieldContainer>

        <FieldContainer>
          <LabelStyle htmlFor="weight">Weight Lifted
            <Field className="input-styled"
              id="weight"
              type="number"
              name="weight"
              placeholder="How many pounds did you lift?"
            />

            {touched.weight && errors.weight && (
              <ParaError>{errors.weight}</ParaError>
            )}

          </LabelStyle>
          
        </FieldContainer>

        <FieldContainer>
          <LabelStyle htmlFor="notes">Notes
            <Field as="textarea" className="note-input"
              id="notes"
              name="notes"
              placeholder="Add note here"
            />
            {touched.notes && errors.notes && (
              <ParaError>{errors.notes}</ParaError>
            )}

          </LabelStyle>


        </FieldContainer>

        <ButtonContainer>
          {/* SubButton = <button> */}
          <BtnStyle type="submit">Log Exercise</BtnStyle>

          <Link exact to="/lastlog">
            <BtnStyle>Return</BtnStyle>
          </Link>
        </ButtonContainer>

      </Form>
    </div>
  )
};

const FormikLogForm = withFormik({
  mapPropsToValues(props) {
    return {
      date: props.date || "",
      exercise: props.exercise || "",
      muscle: props.muscle || "",
      sets: props.sets || "",
      reps: props.reps || "",
      weight: props.weight || "",
      notes: props.notes || ""
    };
  },

  validationSchema: Yup.object().shape({
    date: Yup.string().required("Select a date"),
    exercise: Yup.string().required("Enter exercise name"),
    // targetMuscle: Yup.string().required("error"),
    sets: Yup.number().positive().integer().required("Enter number of sets"),
    reps: Yup.number().positive().integer().required("Enter number of reps")
    // weightLifted: Yup.number().positive().integer().required("Enter lbs lifted"),
    // notes: Yup.string().required("error")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    // event.preventDefault();
    console.log("this is value", values)
    axios
      .post("https://webpt7-weightliftingjournal.herokuapp.com/api/workouts/newworkout", values)
      .then(res => {
        console.log("this is the response: ", res)
        // sends a status update through props in UserForm with value as response.data content
        // this comes from the formikBag
        setStatus(res.data);

        //clears form inputs, from FormikBag
        resetForm();
      })
      .catch(err => console.log(err.response));
    alert("New Exercise Submitted");
  }

})(LogForm);

// export default LogForm;
export default FormikLogForm;