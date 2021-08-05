import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../Component/UI/Card";
import "./style.css";
import Product from "../../../Component/Product";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";
import { Range, getTrackBackground } from "react-range";
import { ResponsiveStream } from "@nivo/stream";

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  // const [values, setValues] = useState([50]);
  let data = [
    {
      oneStar: 1,
      2: 4,
      3: 1,
      4: 9,
      5: 8,
    },
    {
      oneStar: 1,
      2: 3,
      3: 1,
      4: 8,
      5: 4,
    },
    {
      oneStar: 4,
      2: 8,
      3: 6,
      4: 6,
      5: 4,
    },
    {
      oneStar: 8,
      2: 8,
      3: 2,
      4: 8,
      5: 5,
    },
    {
      oneStar: 7,
      2: 9,
      3: 9,
      4: 9,
      5: 8,
    },
    {
      oneStar: 0,
      2: 7,
      3: 3,
      4: 1,
      5: 4,
    },
  ];

  // react-range
  const STEP = 1000;
  const MIN = 0;
  const MAX = 5000000;
  let rtl;
  const [values, setValues] = React.useState([MIN, MAX]);

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <div style={{ padding: "6px", display: "flex" }}>
      <div className="filters grid">
        <Card
          headerLeft={"Filter"}
          headerRight={"CLEAR ALL"}
          margin={"0px"}
          fontSize={"14px"}
        ></Card>
        <Card
          headerLeft={"CATEGORIES"}
          headerRight={"CLEAR"}
          margin={"0px"}
          fontSize={"14px"}
        >
          <div className="card-filter">
            <Button variant="contained">
              Pepsi{" "}
              <CloseIcon
                style={{
                  color: "#16bd49",
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              />
            </Button>
            <Button
              variant="contained"
              style={{
                marginLeft: "10px",
              }}
            >
              Pepsi{" "}
              <CloseIcon
                style={{
                  color: "#16bd49",
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              />
            </Button>
          </div>
        </Card>
        <Card
          headerLeft={"PRICE"}
          headerRight={"CLEAR "}
          margin={"0px"}
          fontSize={"14px"}
        >
          <div className="chart">
            <ResponsiveStream
              data={data}
              keys={["oneStar", "2", "3", "4", "5"]}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: 36,
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: -40,
              }}
              offsetType="silhouette"
              colors={{ scheme: "greens" }}
              fillOpacity={1}
              borderColor={{ theme: "background" }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#2c998f",
                  size: 4,
                  padding: 2,
                  stagger: true,
                },
                {
                  id: "squares",
                  type: "patternSquares",
                  background: "inherit",
                  color: "#e4c912",
                  size: 6,
                  padding: 2,
                  stagger: true,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "Paul",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "Marcel",
                  },
                  id: "squares",
                },
              ]}
              dotSize={8}
              dotColor={{ from: "color" }}
              dotBorderWidth={2}
              dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 100,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999999",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "20px",
            }}
            className="price-range"
          >
            <Range
              values={values}
              step={STEP}
              min={MIN}
              max={MAX}
              rtl={rtl}
              onChange={(values) => {
                setValues(values);
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values,
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: MIN,
                        max: MAX,
                        rtl,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "42px",
                    width: "42px",
                    borderRadius: "4px",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                >
                  <div
                    style={{
                      height: "16px",
                      width: "5px",
                      backgroundColor: isDragged ? "#548BF4" : "#CCC",
                    }}
                  />
                </div>
              )}
            />
            <output
              style={{ marginTop: "30px" }}
              id="output"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                margin: "20px 0",
              }}
            >
              <div>{values[0]}</div>
              <div>{values[1]}</div>
            </output>
          </div>
        </Card>
      </div>
      <div className="flexWrap filters-products ">
        {product &&
          product.products.map((product, index) => (
            <Product product={product} index={index} maxwidth={"l-2-4"} />
          ))}
      </div>
    </div>
  );
};

export default ClothingAndAccessories;
