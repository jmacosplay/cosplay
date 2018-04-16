import PropTypes from 'prop-types';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';

import Gallery from './Gallery'

export class Renderer extends React.Component {
    render () {
        const {images} = this.props;
        /*var images =
                this.state.images.map((i) => {
                    i.customOverlay = (
                            <div style={captionStyle}>
                            <div>{i.caption}</div>
                        </div>);
                    return i;
                });*/
        return (
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                <Gallery
            images={images}
            enableImageSelection={false}/>
                </div>
        );
    }
}

Renderer.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string,
            thumbnail: PropTypes.string,
            srcset: PropTypes.array,
            caption: PropTypes.string,
            thumbnailWidth: PropTypes.number,
            thumbnailHeight: PropTypes.number
        })
    )
};

Renderer.defaultProps = {
    images: []
        /*{
            src: "",
            thumbnail: "",
            thumbnailWidth: 271,
            thumbnailHeight: 320,
            tags: [],
            caption: ""
        }*/
};

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const customTagStyle = {
    wordWrap: "break-word",
    display: "inline-block",
    backgroundColor: "white",
    height: "auto",
    fontSize: "75%",
    fontWeight: "600",
    lineHeight: "1",
    padding: ".2em .6em .3em",
    borderRadius: ".25em",
    color: "black",
    verticalAlign: "baseline",
    margin: "2px"
};

function mapStateToProps(state) {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps)(Renderer)