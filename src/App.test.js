import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import init from './Config';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App init={init} />, div);
});

// 手机号输入框测试
test('phone test', () => {
  let app = mount(<App init={init} />);
  // 测试输入正确手机号，发送验证码按钮状态变为可用
  var phone = {target:{value:'15805173350'}};
  app.nodes[0].handlePhone(phone);
  expect(app.state('status')).toEqual('able');
  // 测试输入错误手机号，发送验证码按钮状态不可用
  var phone = {target:{value:'1580517335a'}};
  app.nodes[0].handlePhone(phone);
  expect(app.state('status')).toEqual('disable');
  // 测试发送验证码按钮状态为发送中时,手机号不可修改
  app.setState({status:'sending'});
  expect(app.nodes[0].handlePhone(phone)).toEqual(false);
});

// 登录按钮点击测试
test('login button test', () => {
  let app = shallow(<App init={init} />);
  var login = app.find('#login');
  // 测试手机号为空提示
  login.simulate('click');
  expect(app.state('tips')).toEqual(init.phoneNullError);
  // 测试登录按钮不可点错误提示
  app.setState({phone:'15805173350'});
  login.simulate('click');
  expect(app.state('tips')).toEqual(init.loginError);
  // 测试验证码为空提示
  app.setState({login:'able'});
  login.simulate('click');
  expect(app.state('tips')).toEqual(init.codeNullError);
  // 测试验证码格式错误提示
  app.setState({code:'123a'});
  login.simulate('click');
  expect(app.state('tips')).toEqual(init.codeTestError);
  // 测试登陆成功提示
  app.setState({code:'123456'});
  login.simulate('click');
  expect(app.state('tips')).toEqual(init.loginSuccess);
});

// 发送验证码按钮点击测试
test('sendCode button test', () => {
  let app = mount(<App init={init} />);
  var sendCode = app.find('#sendCode');
  // 测试按钮不可点击提示
  sendCode.simulate('click');
  expect(app.state('tips')).toEqual(init.disableClick);
  // 测试按钮倒计时功能
  app.setState({status:'able',phone:'15805173350'});
  sendCode.simulate('click');
  expect(app.state('status')).toEqual('sending');
  expect(app.state('countdown')).toEqual('重新发送(' + app.state('nums') + 's)');
  expect((/^[0-9]*$/).test(app.nodes[0].clock)).toEqual(true);						// 定时器启动
  // 测试按钮重置功能
  app.nodes[0].resetButton();
  expect(app.state('status')).toEqual('able');
  // 测试按钮发送中状态提示
  app.setState({status:'sending'});
  sendCode.simulate('click');
  expect(app.state('tips')).toEqual(init.sendingClick);
});