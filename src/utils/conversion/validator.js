class Validator {
  constructor(value) {
    this.value = value;
  }
  newEmail() {
    const regex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(com|in|net|org|us|co)))$/
    );
    return regex.test(this.value);
  }
  email() {
    const regex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regex.test(this.value);
  }
  password() {
    const regex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$^!%*?&#/(/)])[A-Za-z\d@$^!%*?&#/(/)^]{8,}$/
    );
    return regex.test(this.value);
  }

  name() {
    const regex = new RegExp(/^[A-Za-z]{3,30}$/);
    return regex.test(this.value);
  }
  company() {
    //  we are allowing dots,space and no character limit in between
    const regex = new RegExp(/^(?=[a-zA-Z])[a-zA-Z\s.]{3,}$/);
    return regex.test(this.value);
  }

  // we are allowing dots,space in between
  newName() {
    const regex = new RegExp(/^[a-zA-Z][a-zA-Z\s.]{2,29}$/);
    return regex.test(this.value);
  }
  lastName() {
    const regex = new RegExp(/^[A-Za-z]{1,30}$/);
    return regex.test(this.value);
  }
  phone() {
    const regex = new RegExp(/^\d{10}$/);
    return regex.test(this.value);
  }
  mobile() {
    const regex = new RegExp(/^[6-9]\d{9}$/);
    return regex.test(this.value);
  }
  pincode() {
    const regex = new RegExp(/^[1-9][0-9]{5}$/);
    return regex.test(this.value);
  }
  gst() {
    const regex = new RegExp(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
    );
    return regex.test(this.value);
  }
  brokerId() {
    const regex = new RegExp(/^[0-9]{4,}$/);
    return regex.test(this.value);
  }
}

export default Validator;
