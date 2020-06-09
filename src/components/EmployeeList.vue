<template>
  <div>
    <b-button v-b-modal.modal-scrollable>CREATE EMPLOYEE</b-button>
    <p v-if="rowData.length == 0">LOADING DATA TABLE........</p>
    <Grid
      v-if="rowData.length !==0"
      v-bind:parentData="rowData"
      @show-detail="showEmployee"
      @edit-detail="editEmployee"
    />

    <b-modal id="modal-scrollable" ref="my-modal" scrollable title="Create Employee">
      <EmployeeForm @clicked-form-detail="createNewEmployee" v-bind:editData="editdetail" />
    </b-modal>
    <div v-if="showDetail">
      <div class="employee-detail" v-bind:key="data" v-for="data in employeeDetail">
        <h1 class="title">{{data.Name}}</h1>
        <b-btn v-on:click="close">CLOSE</b-btn>
        <hr />
        <p>
          <span>Full Name:</span>
          <span class="bold">{{data.Name}}</span>
        </p>
        <p>
          <span>Employee Code:</span>
          <span class="bold">{{data.EmployeeCode}}</span>
        </p>
        <p>
          <span>Job Title:</span>
          <span class="bold">{{data.jobTitle}}</span>
        </p>
        <p>
          <span>Phone Number:</span>
          <span class="bold">{{data.PhoneNumber}}</span>
        </p>
        <p>
          <span>Email Id:</span>
          <span class="bold">{{data.EmailId}}</span>
        </p>
        <p>
          <span>Region :</span>
          <span class="bold">{{data.Region}}</span>
        </p>
        <p>
          <span>DOB:</span>
          <span class="bold">{{data.Dob}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import EmployeeForm from "./EmployeeForm";
import Grid from "./Grid";
import axios from "axios";

export default {
  name: "EmployeeList",
  data() {
    return {
      rowData: [],
      postBody: {},
      showDetail: false,
      employeeDetail: [],
      editdetail: []
    };
  },
  components: {
    EmployeeForm: EmployeeForm,
    Grid: Grid
  },
  methods: {
    close() {
      this.showDetail = false;
    },
    editEmployee(val) {
      this.editdetail.length = 0;
      this.editdetail.push(val);
      this.$refs["my-modal"].show();
    },
    showEmployee(val) {
      this.showDetail = true;
      this.employeeDetail.length = 0;
      this.employeeDetail.push(val);
    },
    createNewEmployee(val) {
      this.postBody = {
        id: val.id,
        jobTitleName: val.jobTitleName,
        firstName: val.firstName,
        lastName: val.lastName,
        preferredFullName: val.firstName +" "+ val.lastName,
        employeeCode: "E2",
        region: val.region,
        dob: val.dob,
        phoneNumber: val.phoneNumber,
        emailAddress: val.emailAddress
      };

      let Updated = this.rowData.find(x => x.id == this.postBody.id);
      if (Updated) {
        const index = this.rowData.indexOf(Updated);
        this.rowData[index] = this.postBody;
        this.rowData=[...this.rowData];
      } else {
        this.rowData.push(this.postBody);
      }
      axios
        .post(
          "​https://my-json-server.typicode.com/darshanp40/employeedb/employees​/" +
            val.id
        )
        .then(res => {
          console.log(res);
        });
        this.editdetail.length = 0;
      this.$refs["my-modal"].hide();
    }
  },
  created() {
    axios
      .get(
        "https://my-json-server.typicode.com/darshanp40/employeedb/employees"
      )
      .then(res => {
        this.rowData = res.data[0];
      });
  }
};
</script>

<style>
.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 5px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
.modal-footer {
  display: none !important;
}
.bold {
  font-weight: 700;
  margin-left: 18px;
}
.employee-detail {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: #fff;
  right: 50%;
  left: 50%;
  width: 50%;
  border: 1px solid #eee;
}
</style>