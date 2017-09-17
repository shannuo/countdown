import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Countdown from './Countdown';
import init from './Config';

// 发送验证码按钮点击测试
test('sendCode button test', () => {
  let app = mount(<Countdown status='disable' nums={init.nums} sendCode={function(){}} callback={function(){}} disableClick={init.disableClick} sendingClick={init.sendingClick} />);
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