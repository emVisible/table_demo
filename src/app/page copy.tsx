"use client";
import { Button, Table } from "antd";
import Image from "next/image";
import { useState } from "react";
import mockData, { DataType } from "./data";
import Column from "antd/es/table/Column";

export default function Home() {
  const columns = [
    {
      title: "单据号",
      dataIndex: "invoicesNumber",
      key: "invoicesNumber",
    },
    {
      title: "下载状态",
      dataIndex: "downloadStatus",
      key: "downloadStatus",
    },
    {
      title: "抽取状态",
      dataIndex: "extractStatus",
      key: "extractStatus",
    },
    {
      title: "推送状态",
      dataIndex: "pushStatus",
      key: "pushStatus",
    },
    {
      title: "下载时间",
      dataIndex: "downloadTime",
      key: "downloadTime",
    },
  ];
  const expandedRowRender = (record: DataType) => {
    const { attachment } = record;
    const AttachmentWrap = (props: Record<"text", string>) => {
      const { text } = props;
      return <div className="px-12 py-4 hover:border-l-4">{text}</div>;
    };
    console.log("record", record);
    return (
      <div className="flex flex-col ">
        {attachment && attachment.length !== 0 ? (
          attachment.map((attachment) => {
            console.log("attachment", attachment);
            return <AttachmentWrap text={attachment}></AttachmentWrap>;
          })
        ) : (
          <AttachmentWrap text={"无附件"}></AttachmentWrap>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen p-12 bg-violet-300">
      <Table
        className="overflow-hidden"
        bordered={false}
        expandable={{
          expandedRowRender,
          expandedRowClassName: () => "",
          expandIcon: ({ expanded, onExpand, record }) => (
            <div
              className="absolute h-full left-0 top-0 w-[2000px] cursor-pointer z-40"
              onClick={(e) => {
                console.log("expanded", expanded);
                console.log("onExpand", onExpand);
                console.log("record", record);
                onExpand(record, e);
              }}
            ></div>
          ),
        }}
        columns={columns}
        dataSource={mockData}
        pagination={false}
      ></Table>
    </div>
  );
}
