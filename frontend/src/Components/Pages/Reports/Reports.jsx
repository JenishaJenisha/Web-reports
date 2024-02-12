import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import "./Reports.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardcomponent,
  setReportComponent,
  setSelectedTempData,
  setSelectedTemplateComponent,
} from "../../Store/slices/TemplateSlice/templateslice";
import ExistingReports from "./existingReports";

const Reports = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const templateList = useSelector((state) => state.templates);
  const { templates, saveastemplates } = templateList;
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const handleNewReportNavigate = () => {
    dispatch(setDashboardcomponent(true));
    dispatch(setReportComponent(false));
  };
  const handleExistingReportNavigation = () => {
    dispatch(setReportComponent(true));
  };
  const handleaddreport = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleNewReportNavigate();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    handleExistingReportNavigation();
    setIsExisting(true);
  };
  const handleExistingtemplatemodelOk = () => {
    setIsExisting(false);

    dispatch(setSelectedTemplateComponent(true));
    dispatch(setReportComponent(false));
  };
  const handleExistingtemplatemodelCancel = () => {
    setIsExisting(false);
  };
  const navExistingtemplate = (selectedExisting) => {
    const selectedTemplateInTemplates = templates?.find(
      (template) => template.templateId === selectedExisting
    );
    const selectedsaveasTemplateInTemplates = saveastemplates?.find(
      (saveastemp) => saveastemp.saveastempId === selectedExisting
    );
    // console.log(selectedExisting,"navExistingtemplate")
    dispatch(
      setSelectedTempData(
        selectedTemplateInTemplates || selectedsaveasTemplateInTemplates
      )
    );
    setSelectedTemplate(selectedExisting);
  };
  return (
    <>
      <div className="reportpageheader">
        <h2>***Reports***</h2>
        <div className="searchAddbtn">
          <div className="reportaddbtn">
            <Button onClick={handleaddreport} className="addbtn">
              <PlusCircleOutlined />
              Add Report
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="ReportSelection"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="new"
        cancelText="Existing Template"
        className="templatenameform"
      >
        <h3 className="reportmodel">
          Do you want to create the report from the Existing template or a new
          one?
        </h3>
      </Modal>
      <Modal
        title="Existing Templates"
        open={isExisting}
        okText="Open"
        cancelText="cancel"
        onOk={handleExistingtemplatemodelOk}
        onCancel={handleExistingtemplatemodelCancel}
      >
        {templates.concat(saveastemplates).map((template) => {
          const templateId = template.templateId || template.saveastempId;
          const isSelected = templateId === selectedTemplate;
          return (
            <div
              key={templateId}
              className={`listingtemplates ${isSelected ? "selected" : ""}`}
              onClick={() => navExistingtemplate(templateId)}
            >
              <p>{template.name || template.saveastempName}</p>
            </div>
          );
        })}
      </Modal>
      <ExistingReports />
    </>
  );
};

export default Reports;
