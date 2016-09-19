import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import {mount, render, shallow} from 'enzyme';
import {expect} from 'chai';
import SearchCard from '../src/js/app/search/SearchCard';

function myAwesomeDebug (wrapper) {
  let html = wrapper.html()
  // do something cool with the html
  return html
}

chai.use(chaiEnzyme(myAwesomeDebug));

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    )
  }
}



describe('<SearchCard />', function () {
  it('should work', function () {
  	const wrapper1 = mount(<SearchCard />); // mount/render/shallow when applicable
    expect(wrapper1.find('.search-card')).to.have.length(1);
    console.log(wrapper1);
	// expect(wrapper1.find('#not')).to.not.be.checked();
  });
});
