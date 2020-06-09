<template>
  <form>
    <div class="container">
      <div>
        <label for="id">
          <b>ID</b>
        </label>
        <input type="text"  v-model="formData.id" placeholder="ID" name="id" id="id" required />
      </div>
      <div>
        <label for="firstName">
          <b>First Name</b>
        </label>
        <input
          type="text"
          v-model="formData.firstName"
          placeholder="First Name"
          name="firstName"
          id="firstName"
          required
        />
      </div>
      <div>
        <label for="lastName">
          <b>Last Name</b>
        </label>
        <input
          type="text"
          v-model="formData.lastName"
          placeholder="Last Name"
          name="lastName"
          id="lastName"
          required
        />
      </div>
      <div>
        <label for="title">
          <b>Job Title</b>
        </label>
        <input
          type="text"
          v-model="formData.jobTitleName"
          placeholder="Job Title"
          name="title"
          id="title"
          required
        />
      </div>
      <div>
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          v-model="formData.emailAddress"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
        />
      </div>
      <div>
        <label for="number">
          <b>Phone Number</b>
        </label>
        <input
          type="text"
          v-model="formData.phoneNumber"
          placeholder="Phone Number"
          name="number"
          id="number"
          required
        />
      </div>
      <div>
        <label for="region">
          <b>Region</b>
        </label>
        <input
          type="text"
          v-model="formData.region"
          placeholder="Region"
          name="region"
          id="region"
          required
        />
      </div>
      <div>
        <label for="dob">
          <b>DOB</b>
        </label>
        <input type="text" v-model="formData.dob" placeholder="DOB" name="dob" id="dob" required />
      </div>
    </div>
    <div class="footer">
      <b-btn type="submit" class="right mt-4" variant="primary" v-on:click="createFormData($event)">Create</b-btn>
      <b-btn class="right mt-4" variant="link">Cancel</b-btn>
    </div>
  </form>
</template>



<script>
export default {
  name: "EmployeeForm",
  props: ["editData"],
  data() {
    return {
      formData: {
        id: "",
        firstName: "",
        lastName: "",
        region: "",
        jobTitleName: "",
        phoneNumber: "",
        dob: "",
        emailAddress: ""
      }
    
    };
  },
   mounted() {
    let obj = JSON.parse(JSON.stringify(this.editData[0]));
    this.formData = {
        "id": obj.id,
        "firstName": obj.Name.split(" ")[0],
        "lastName": obj.Name.split(" ")[1],
        "region": obj.Region,
        "jobTitleName": obj.jobTitle,
        "phoneNumber": obj.PhoneNumber,
        "dob":obj.Dob,
        "emailAddress": obj.EmailId
    }
  },
  methods: {
    createFormData(e) {
      e.preventDefault();
      if(this.formData.id && this.formData.firstName && this.formData.lastName && 
      this.formData.region && this.formData.jobTitleName && this.formData.phoneNumber && this.formData.dob
      && this.formData.emailAddress){
      this.$emit("clicked-form-detail", this.formData);
      }
    }
  }
}
</script>

<style>
.footer {
  border-top: 1px solid #c0c0c0;
  margin-top: 4px;
}
.right {
  float: right;
}
.mt-4 {
  margin-top: 4px;
}
</style>