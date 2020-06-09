import React, { Component } from 'react';
import styled from 'styled-components';
import { blue, borderRadius, grayBg, grayText, placeholderColor, systemFont, white } from 'style/constants';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.padBottom ? 15 : 0}px;
  width: 100%;
`;

const Input = styled.input`
  font-family: ${systemFont};
  font-size: 18px;
  font-weight: 400;
  padding: 10px 16px;
  padding-right: 12px;
  outline: none;
  border-radius: ${borderRadius};
  border: none;
  margin: 0;
  background-color: ${grayBg};
  color: ${grayText};
  flex: 1;
  order: 1;

  &::placeholder {
    color: ${placeholderColor};
  }
`;

const Button = styled.div`
  font-family: ${systemFont};
  background-color: ${blue};
  color: ${white};
  font-size: 16px;
  font-weight: 600;
  border-radius: ${borderRadius};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 7px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer
  transition: 0.2s ease-out;
  order: 2;

  & + ${Input} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.focused) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    }, () => {
      this.props.onChange({
        target: {
          id: this.props.id,
          value: this.state.value,
        }
      });
    });
  }

  onClick() {
    if (this.state.value.trim().length > 0) {
      this.setState({
        value: ''
      }, this.props.onSubmit);
    }
  }

  onKeyDown(e) {
    if (this.props.onSubmit && e.keyCode === 13) {
      this.onClick();
      this.input.focus();
    }
  }

  render() {
    return (
      <Container padBottom={this.props.padBottom}>
        {this.props.onSubmit && <Button onClick={this.onClick}>{this.props.submitText}</Button>}
        <Input
          innerRef={ref => this.input = ref}
          autoComplete={this.props.autoComplete}
          id={this.props.id}
          value={this.state.value}
          tabIndex={this.props.tabIndex}
          placeholder={this.props.placeholder}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange} />
      </Container>
    )
  }
}

export default TextInput;