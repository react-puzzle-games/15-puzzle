import renderer from 'react-test-renderer';
import React from 'react';
import Tile from './Tile';
import { Component as ReactTile } from './Tile';
import { shallow } from 'enzyme';

describe('Tile', () => {
  describe('render tests', () => {
    it('should have a computed class prop', () => {
      const wrapper = shallow(
        <Tile
          tileId={50}
          left={0}
          top={0}
          number={13}
          width={90}
          height={90}
        />,
      );
      expect(wrapper.props().className).not.toBeUndefined();
    });

    it('should render correctly given custom number', () => {
      const tree = renderer
        .create(
          <Tile
            tileId={50}
            left={0}
            top={0}
            number={13}
            width={90}
            height={90}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly given default number', () => {
      const tree = renderer
        .create(
          <Tile tileId={18} left={-40} top={-20} width={120} height={120} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly given correct prop', () => {
      const tree = renderer
        .create(
          <Tile
            tileId={13}
            left={0}
            top={50}
            correct={true}
            width={90}
            height={90}
            number={23}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly given visible prop', () => {
      const tree = renderer
        .create(
          <Tile
            tileId={4}
            left={30}
            top={0}
            visible={false}
            width={30}
            height={30}
            number={1}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('callback tests', () => {
    it('should call onClick function passed', () => {
      const onClick = jest.fn();
      const number = 42;

      const wrapper = shallow(
        <ReactTile
          tileId={4}
          left={30}
          top={0}
          correct={true}
          width={30}
          height={30}
          number={number}
          onClick={onClick}
        />,
      );

      wrapper.instance().onClick();
      expect(onClick).toBeCalled();
    });
  });
});
