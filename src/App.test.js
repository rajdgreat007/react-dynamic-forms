import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DynamicForm from './components/DynamicForm';
import {shallow} from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const DynamicFormConfig1 = {
  items: [
    {
      "name": "person_name",
      "label": "Person's Name",
      "type": "TextField",
    },
    {
      "name": "person_other",
      "label": "Person other",
      "type": "TextField",
    }
  ]
};

const DynamicFormConfig2 = {
  items: [
    {
      "name": "name1",
      "label": "Person's Name",
      "type": "TextField",
      "children": DynamicFormConfig1
    },
    {
      "name": "name2",
      "label": "Person other",
      "type": "TextField",
    }
  ]
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Test submit event', () => {
  const mockCallBack = jest.fn();

  const DynamicForm = shallow(<DynamicForm config={{items: []}} onSubmit={mockCallBack} />);
  DynamicForm.find('button').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('Test normal config', () => {
  const onSubmit = jest.fn();
  const DynamicForm = shallow(<DynamicForm config={DynamicFormConfig1} onSubmit={onSubmit} />);
  DynamicForm.find('button').simulate('click');
  expect(onSubmit).toBeCalledWith(
    expect.objectContaining({
      'person_name': expect.any(String),
      'person_other': expect.any(String),
    }),
  );
});

it('Test recursive config', () => {
  const onSubmit = jest.fn();
  const DynamicForm = shallow(<DynamicForm config={DynamicFormConfig2} onSubmit={onSubmit} />);
  DynamicForm.find('button').simulate('click');
  expect(onSubmit).toBeCalledWith(
    expect.objectContaining({
      'person_name': expect.any(String),
      'person_other': expect.any(String),
      'name1': expect.any(String),
      'name2': expect.any(String)
    }),
  );
});

it('Receives user input', () => {
  const onSubmit = jest.fn();
  const DynamicForm = shallow(<DynamicForm config={{DynamicFormConfig1}} onSubmit={onSubmit} />);
  DynamicForm.find('[name="person_name"]').simulate('change', {
    persist: () => null,
    target: 
      {
        name: 'person_name',
        value: 'Tom Selleck',
      }
  });
  DynamicForm.find('button').simulate('click');
  expect(onSubmit).toBeCalledWith(
    expect.objectContaining({
      'person_name': expect.stringContaining('Tom Selleck')
    }),
  );
});
