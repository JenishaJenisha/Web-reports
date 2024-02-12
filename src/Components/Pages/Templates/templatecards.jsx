import React, { useState } from "react";
import { Card, Row, Col, Input, Empty, Button } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTempData,
  setSelectedTemplateComponent,
  setTemplateComponent,
  setDashboardcomponent,
} from "../../Store/slices/TemplateSlice/templateslice";
const Templatecards = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const templatelist = useSelector((state) => state.settings.templatelist);
  const saveastemplatelist = useSelector(
    (state) => state.templates.saveastemplates
  );
  const templates = useSelector((state) => state.templates.templates);
  const handleMenuItemClick = (selectedTemplateId) => {
    // const selectedTemplate = templates.find(
    //   (template) => template.templateId === selectedTemplateId
    // );

    const selectedTemplateInTemplates = templates?.find(
      (template) => template.templateId === selectedTemplateId
    );

    const selectedTemplateInSaveAsList = saveastemplatelist?.find(
      (template) => template.saveastempId === selectedTemplateId
    );

    if (selectedTemplateInTemplates) {
      dispatch(setSelectedTempData(selectedTemplateInTemplates));
      dispatch(setSelectedTemplateComponent(true));
      dispatch(setTemplateComponent(false));
    } else if (selectedTemplateInSaveAsList) {
      dispatch(setSelectedTempData(selectedTemplateInSaveAsList));
      dispatch(setSelectedTemplateComponent(true));
      dispatch(setTemplateComponent(false));
    }

    // dispatch(setSelectedTempData(selectedTemplate));
    // dispatch(setSelectedTemplateComponent(true));
    // dispatch(setTemplateComponent(false))
    // console.log(selectedTemplateId, selectedTemplate, "selectedTemplate",);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSaveAsTerm, setSearchSaveAsTerm] = useState("");
  const filteredTemplates = templatelist.filter((item) => {
    const templateName = item.templateName || item.saveastempName;
    return templateName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredSaveAsTemplates = saveastemplatelist.filter((item) => {
    const templateName = item.templateName || item.saveastempName;
    return templateName.toLowerCase().includes(searchSaveAsTerm.toLowerCase());
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSearchSaveAsTerm(value);
  };

  const handleSaveAsSearch = (value) => {
    setSearchSaveAsTerm(value);
  };
  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };
  const items = filteredTemplates
    .concat(filteredSaveAsTemplates)
    .map((item) => (
      <Col span={6} key={item.templateId || item.saveastempId}>
        <Card
          className="templatecardview"
          onClick={() =>
            handleMenuItemClick(item.templateId || item.saveastempId)
          }
        >
          <h3 className="tempcardname">
            <u>{item.templateName || item.saveastempName}</u>
          </h3>
          <p><b>CreatedAt:</b>&nbsp;&nbsp;{formatDate(item.createdAt)} </p>
          <p><b>Modified at:</b>&nbsp;&nbsp;{formatDate(item.modifiedAt)}</p>
        </Card>
      </Col>
    ));
  const chunkSize = 4; // Number of items in each row
  const rows = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    rows.push(
      <Row gutter={16} key={i}>
        {items.slice(i, i + chunkSize)}
      </Row>
    );
  }
  const handlenewTemplate = () => {
    dispatch(setDashboardcomponent(true));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setTemplateComponent(false));
  };
  return (
    <>
      <div className="cardview">
        <div className="tempcardheading">
          <h2>***Templates***</h2>
          <div className="addsearchflex">
            <div className="searchbox">
              <Search
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </div>
            <div>
              <Button onClick={handlenewTemplate} className="saveasbtn">
                <PlusCircleOutlined />
                Create New
              </Button>
            </div>
          </div>
        </div>

        {items.length > 0 ? (
          rows
        ) : (
          <Empty
            imageStyle={{ height: "203px", marginTop: "349px" }}
            description="Template data not found  "
            className="empty"
          />
        )}
      </div>
    </>
  );
};

export default Templatecards;
