import UserRegistrationPageLayout from "../templates/UserRegistrationPageLayout.js";
import UserCreationForm from "../UI/organisms/UserCreationForm.js";
const UserRegistration = (props) => {
  return (
    <UserRegistrationPageLayout>
      <UserCreationForm />
    </UserRegistrationPageLayout>
  );
};
export default UserRegistration;
