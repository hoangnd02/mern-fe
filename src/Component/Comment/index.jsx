import React, { useState } from "react";
import "./style.css";
import HoverRating from "../../Component/HoverRating";
import Rating from "@material-ui/lab/Rating";
import SendIcon from "@material-ui/icons/Send";
import { Button } from "@material-ui/core";
import { addComment } from "../../actions/comment.actions";
import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import { generatePublicUrl } from "../../urlConfig";

const Comment = ({ comment, productId }) => {
  console.log(comment);

  const [cmt, setCmt] = useState("");
  const [cmtImage, setCmtImage] = useState([]);
  const [images, setImages] = useState([]);
  // Rating star
  const [hover, setHover] = React.useState(-1);
  const [value, setValue] = React.useState(5);

  const dispatch = useDispatch();

  const handleKeypress = (e) => {
    console.log(e);
    if (e.charCode === 13) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    const form = new FormData();
    console.log(cmt);
    form.append("content", cmt);
    form.append("star", value);
    for (let img of images) {
      form.append("commentImage", img);
    }
    dispatch(addComment(form, productId));
  };

  const handleImg = (e) => {
    setCmtImage([...cmtImage, URL.createObjectURL(e.target.files[0])]);
    setImages([...images, e.target.files[0]]);

    console.log([...images, e.target.files[0]]);
  };
  const handleClick = (e) => {
    setCmt(e.target.innerHTML);
    console.log(value);
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  return (
    <div className="comment">
      <div className="comment_title">
        <div className="comment_title-left">Ratings & Reviews</div>
        {/* <button className="comment_title-right" > */}
        <HoverRating />
        {/* </button> */}
      </div>
      <div className="rating">
        <div className="rating-star">
          <div className="rating-star1">3.8★</div>
          <div className="rating-star2">13 Ratings & 2 Reviews</div>
        </div>
        <div className="rating-counts">
          <div className="rating-count">
            5 ★
            <div className="rating-count-width">
              <span
                className="rating-count-width-span"
                style={{ width: "80%" }}
              ></span>
            </div>
            6
          </div>
          <div className="rating-count">
            4 ★
            <div className="rating-count-width">
              <span
                className="rating-count-width-span"
                style={{ width: "60%" }}
              ></span>
            </div>
            6
          </div>
          <div className="rating-count">
            3 ★
            <div className="rating-count-width">
              <span
                className="rating-count-width-span"
                style={{ width: "50%" }}
              ></span>
            </div>
            6
          </div>
          <div className="rating-count">
            2 ★
            <div className="rating-count-width">
              <span
                className="rating-count-width-span"
                style={{ width: "30%" }}
              ></span>
            </div>
            6
          </div>
          <div className="rating-count">
            1 ★
            <div className="rating-count-width">
              <span
                className="rating-count-width-span"
                style={{ width: "10%" }}
              ></span>
            </div>
            6
          </div>
        </div>
      </div>
      <div className="reviews">
        <div className="reviews_items">
          <div className="reviews_item">
            <div className="reviews_item-comment" style={{ display: "block" }}>
              <div className="reviews_item-top">
                <div
                  style={{ width: 200, display: "flex", alignItems: "center" }}
                >
                  <Rating
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {value !== null && (
                    <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
                  )}
                </div>
              </div>
              <div className="reviews_item-bot">
                <div
                  className="input-cmt"
                  contentEditable="true"
                  role="text-box"
                  spellCheck="true"
                  style={{
                    outline: "none",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    background: "#f7f7f7",
                    padding: "10px 14px",
                    margin: "16px 0",
                  }}
                  value={cmt}
                  onChange={handleClick}
                  onInput={handleClick}
                  // onKeyPress={handleKeypress}
                ></div>
                <button className="send" onClick={handleSubmit}>
                  <SendIcon style={{ color: "#16bd49" }} />
                </button>
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" hidden onChange={handleImg} />
                </Button>
                <div className="reviews_item-img">
                  {cmtImage &&
                    cmtImage.map((img) => {
                      return <img src={img} alt="" />;
                    })}
                </div>
              </div>
              <div className="reviews_item-bottom">
                <div className="item-bottom">
                  <div className="reviews_item-name">Hoang Dang</div>
                  <div className="reviews_item-time">14/12/2002</div>
                </div>
                <div className="item-bottom">
                  <div className="reviews_item-vote">222</div>
                  <div className="reviews_item-vote">
                    <div className="heart" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {comment.comment[productId] ? (
            comment.comment[productId].map((comment, index) => {
              return (
                <div className="reviews_item">
                  <div className="reviews_item-comment">
                    <div className="reviews_item-top">
                      <Rating
                        name="half-rating-read"
                        defaultValue={comment.star}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <div className="reviews_item-bot">
                      {comment.content}
                      <div className="reviews_item-img">
                        {console.log(JSON.stringify(comment.cmtImg[0].img))}
                        {comment.cmtImg.map((image) => {
                          return (
                            <img src={generatePublicUrl(image.img)} alt="" />
                          );
                        })}
                      </div>
                    </div>
                    <div className="reviews_item-bottom">
                      <div className="item-bottom">
                        <div className="reviews_item-name">Hoang Dang</div>
                        <div className="reviews_item-time">14/12/2002</div>
                      </div>
                      <div className="item-bottom">
                        <div className="reviews_item-vote">222</div>
                        <div className="reviews_item-vote">
                          <div className="heart" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <span> Chưa có bình luận</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
