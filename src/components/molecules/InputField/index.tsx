import React from 'react';
import styled from "styled-components/native";
import MainButton from "../../atoms/MainButton";

interface Props {
  onPress: () => void;
}

const StyledText  = styled.Text`
    color: white;
    font-size: 10px;
    text-align: center;
    vertical-align: middle;
`;

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 40px;
  width: 250px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: background;
`

const InputField = (props: Props) => {
  const {onPress} = props;
  return (
    <form className="input">
      <StyledText>
      <ButtonContainer>
      <input
        placeholder="Search by Keywords"
      />
      <input
        placeholder="Search by Location"
      />
      </ButtonContainer>
      </StyledText>
      <StyledText>
      <MainButton title={"Search"}/>
      </StyledText>
    </form>
  );
};

export default InputField;
