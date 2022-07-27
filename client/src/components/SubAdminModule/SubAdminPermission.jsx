import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function SubAdminPermission() {
  const auth = localStorage.getItem("admin");
  const [nameData, setNameData] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();
  const [module, setModule] = useState({
    SubAdminModule: "",
    PGModule: "",
    MIDModule: "",
    ChineseBankModule: "",
    BankCodeBankConnectModule: "",
    BankCodeModule: "",
    MerchantModule: "",
    TransactionModule: "",
    SandBoxModule: "",
    BannerModule: "",
    SettlementModule: "",
    ActivityLogs: "",
    ContactModule: "",
    CMSModule: "",
    MetaModule: "",
    SettingModule: "",
    ChangePassword: "",
  });

  const [SubAdminModule, setSubAdminModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [PGModule, setPGModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [MIDModule, setMIDModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });

  const [ChineseBankModule, setChineseBankModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [BankCodeBankConnectModule, setBankCodeBankConnectModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [BankCodeModule, setBankCodeModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [MerchantModule, setMerchantModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [TransactionModule, setTransactionModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [SandBoxModule, setSandBoxModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [BannerModule, setBannerModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [SettlementModule, setSettlementModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [ActivityLogs, setActivityLogs] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [ContactModule, setContactModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [CMSModule, setCMSModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [MetaModule, setMetaModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [SettingModule, setSettingModule] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const [ChangePassword, setChangePassword] = useState({
    Add: "",
    Edit: "",
    View: "",
    Delete: "",
  });
  const subAdminOnchange = (e) => {
    setSubAdminModule({
      ...SubAdminModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(SubAdminModule);
  };
  const PGOnchange = (e) => {
    setPGModule({
      ...PGModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(PGModule);
  };

  const MIDOnchange = (e) => {
    setMIDModule({
      ...MIDModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(MIDModule);
  };

  const ChineseBankOnchange = (e) => {
    setChineseBankModule({
      ...ChineseBankModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(ChineseBankModule);
  };
  const BankCodeBankConnectOnchange = (e) => {
    setBankCodeBankConnectModule({
      ...BankCodeBankConnectModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(BankCodeBankConnectModule);
  };
  const BankCodeOnchange = (e) => {
    setBankCodeModule({
      ...BankCodeModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(BankCodeModule);
  };
  const MerchantOnchange = (e) => {
    setMerchantModule({
      ...MerchantModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(MerchantModule);
  };

  const TransactionOnchange = (e) => {
    setTransactionModule({
      ...TransactionModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(TransactionModule);
  };
  const SandBoxOnchange = (e) => {
    setSandBoxModule({
      ...SandBoxModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(SandBoxModule);
  };

  const BannerOnchange = (e) => {
    setBannerModule({
      ...BannerModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(BannerModule);
  };

  const SettlementOnchange = (e) => {
    setSettlementModule({
      ...SettlementModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(SettlementModule);
  };
  const ActivityLogsOnchange = (e) => {
    setActivityLogs({
      ...ActivityLogs,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(ActivityLogs);
  };
  const ContactOnchange = (e) => {
    setContactModule({
      ...ContactModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(ContactModule);
  };
  const CMSOnchange = (e) => {
    setCMSModule({
      ...CMSModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(CMSModule);
  };
  const MetaOnchange = (e) => {
    setMetaModule({
      ...MetaModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(MetaModule);
  };
  const SettingOnchange = (e) => {
    setSettingModule({
      ...SettingModule,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(SettingModule);
  };
  const ChangePasswordOnchange = (e) => {
    setChangePassword({
      ...ChangePassword,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
    console.log(ChangePassword);
  };
  // Module Change 😎
  const moduleHandleChange = (e) => {
    setModule({ ...module, [e.target.name]: e.target.checked ? 1 : 0 });
    console.log(module);
  };

  // Submit Form

  const hamdleSubmit = async () => {
    let actionData = [
      {
        moduleName: 0,
        m_add: SubAdminModule.Add,
        m_edit: SubAdminModule.Edit,
        m_view: SubAdminModule.View,
        m_delete: SubAdminModule.Delete,
        status: module.SubAdminModule,
      },
      {
        moduleName: 1,
        m_add: PGModule.Add,
        m_edit: PGModule.Edit,
        m_view: PGModule.View,
        m_delete: PGModule.Delete,
        status: module.PGModule,
      },
      {
        moduleName: 2,
        m_add: MIDModule.Add,
        m_edit: MIDModule.Edit,
        m_view: MIDModule.View,
        m_delete: MIDModule.Delete,
        status: module.MIDModule,
      },
      {
        moduleName: 3,
        m_add: ChineseBankModule.Add,
        m_edit: ChineseBankModule.Edit,
        m_view: ChineseBankModule.View,
        m_delete: ChineseBankModule.Delete,
        status: module.ChineseBankModule,
      },
      {
        moduleName: 4,
        m_add: BankCodeBankConnectModule.Add,
        m_edit: BankCodeBankConnectModule.Edit,
        m_view: BankCodeBankConnectModule.View,
        m_delete: BankCodeBankConnectModule.Delete,
        status: module.BankCodeBankConnectModule,
      },
      {
        moduleName: 5,
        m_add: BankCodeModule.Add,
        m_edit: BankCodeModule.Edit,
        m_view: BankCodeModule.View,
        m_delete: BankCodeModule.Delete,
        status: module.BankCodeModule,
      },
      {
        moduleName: 6,
        m_add: MerchantModule.Add,
        m_edit: MerchantModule.Edit,
        m_view: MerchantModule.View,
        m_delete: MerchantModule.Delete,
        status: module.MerchantModule,
      },
      {
        moduleName: 7,
        m_add: TransactionModule.Add,
        m_edit: TransactionModule.Edit,
        m_view: TransactionModule.View,
        m_delete: TransactionModule.Delete,
        status: module.TransactionModule,
      },
      {
        moduleName: 8,
        m_add: SandBoxModule.Add,
        m_edit: SandBoxModule.Edit,
        m_view: SandBoxModule.View,
        m_delete: SandBoxModule.Delete,
        status: module.SandBoxModule,
      },
      {
        moduleName: 9,
        m_add: BannerModule.Add,
        m_edit: BannerModule.Edit,
        m_view: BannerModule.View,
        m_delete: BannerModule.Delete,
        status: module.BannerModule,
      },
      {
        moduleName: 10,
        m_add: SettlementModule.Add,
        m_edit: SettlementModule.Edit,
        m_view: SettlementModule.View,
        m_delete: SettlementModule.Delete,
        status: module.SettlementModule,
      },
      {
        moduleName: 11,
        m_add: ActivityLogs.Add,
        m_edit: ActivityLogs.Edit,
        m_view: ActivityLogs.View,
        m_delete: ActivityLogs.Delete,
        status: module.ActivityLogs,
      },
      {
        moduleName: 12,
        m_add: ContactModule.Add,
        m_edit: ContactModule.Edit,
        m_view: ContactModule.View,
        m_delete: ContactModule.Delete,
        status: module.ContactModule,
      },
      {
        moduleName: 13,
        m_add: CMSModule.Add,
        m_edit: CMSModule.Edit,
        m_view: CMSModule.View,
        m_delete: CMSModule.Delete,
        status: module.CMSModule,
      },
      {
        moduleName: 14,
        m_add: MetaModule.Add,
        m_edit: MetaModule.Edit,
        m_view: MetaModule.View,
        m_delete: MetaModule.Delete,
        status: module.MetaModule,
      },
      {
        moduleName: 15,
        m_add: SettingModule.Add,
        m_edit: SettingModule.Edit,
        m_view: SettingModule.View,
        m_delete: SettingModule.Delete,
        status: module.SettingModule,
      },
      {
        moduleName: 16,
        m_add: ChangePassword.Add,
        m_edit: ChangePassword.Edit,
        m_view: ChangePassword.View,
        m_delete: ChangePassword.Delete,
        status: module.ChangePassword,
      },
    ];
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("actionData", JSON.stringify(actionData));

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/permissionSubAdmin`,
        formData,
        config
      );

      console.log(result);

      if (result.status === 200) {
        toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/subAdmin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("id", id);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(
          `${baseUrl}/getPermissionDetails`,
          formData,
          config
        );
        console.log(result.data.details[0])

        setNameData(result.data.details[0]);

        //Module Change 😎
        setModule({
          ...module,
          SubAdminModule: result.data.permissions[0]
            ? result.data.permissions[0].status
            : 0,
          PGModule: result.data.permissions[1]
            ? result.data.permissions[1].status
            : 0,
          MIDModule: result.data.permissions[2]
            ? result.data.permissions[2].status
            : 0,
          ChineseBankModule: result.data.permissions[3]
            ? result.data.permissions[3].status
            : 0,
          BankCodeBankConnectModule: result.data.permissions[4]
            ? result.data.permissions[4].status
            : 0,
          BankCodeModule: result.data.permissions[5]
            ? result.data.permissions[5].status
            : 0,
          MerchantModule: result.data.permissions[6]
            ? result.data.permissions[6].status
            : 0,
          TransactionModule: result.data.permissions[7]
            ? result.data.permissions[7].status
            : 0,
          SandBoxModule: result.data.permissions[8]
            ? result.data.permissions[8].status
            : 0,
          BannerModule: result.data.permissions[9]
            ? result.data.permissions[9].status
            : 0,
          SettlementModule: result.data.permissions[10]
            ? result.data.permissions[10].status
            : 0,
          ActivityLogs: result.data.permissions[11]
            ? result.data.permissions[11].status
            : 0,
          ContactModule: result.data.permissions[12]
            ? result.data.permissions[12].status
            : 0,
          CMSModule: result.data.permissions[13]
            ? result.data.permissions[13].status
            : 0,
          MetaModule: result.data.permissions[14]
            ? result.data.permissions[14].status
            : 0,
          SettingModule: result.data.permissions[15]
            ? result.data.permissions[15].status
            : 0,
          ChangePassword: result.data.permissions[16]
            ? result.data.permissions[16].status
            : 0,
        });

        //  Action Change 😎
        setSubAdminModule({
          ...SubAdminModule,
          Add: result.data.permissions[0].m_add,
          Edit: result.data.permissions[0].m_edit,
          View: result.data.permissions[0].m_view,
          Delete: result.data.permissions[0].m_delete,
        });
        setPGModule({
          ...PGModule,
          Add: result.data.permissions[1].m_add,
          Edit: result.data.permissions[1].m_edit,
          View: result.data.permissions[1].m_view,
          Delete: result.data.permissions[1].m_delete,
        });
        setMIDModule({
          ...MIDModule,
          Add: result.data.permissions[2].m_add,
          Edit: result.data.permissions[2].m_edit,
          View: result.data.permissions[2].m_view,
          Delete: result.data.permissions[2].m_delete,
        });
        setChineseBankModule({
          ...ChineseBankModule,
          Add: result.data.permissions[3].m_add,
          Edit: result.data.permissions[3].m_edit,
          View: result.data.permissions[3].m_view,
          Delete: result.data.permissions[3].m_delete,
        });
        setBankCodeBankConnectModule({
          ...BankCodeBankConnectModule,
          Add: result.data.permissions[4].m_add,
          Edit: result.data.permissions[4].m_edit,
          View: result.data.permissions[4].m_view,
          Delete: result.data.permissions[4].m_delete,
        });
        setBankCodeModule({
          ...BankCodeModule,
          Add: result.data.permissions[5].m_add,
          Edit: result.data.permissions[5].m_edit,
          View: result.data.permissions[5].m_view,
          Delete: result.data.permissions[5].m_delete,
        });
        setMerchantModule({
          ...MerchantModule,
          Add: result.data.permissions[6].m_add,
          Edit: result.data.permissions[6].m_edit,
          View: result.data.permissions[6].m_view,
          Delete: result.data.permissions[6].m_delete,
        });
        setTransactionModule({
          ...TransactionModule,
          Add: result.data.permissions[7].m_add,
          Edit: result.data.permissions[7].m_edit,
          View: result.data.permissions[7].m_view,
          Delete: result.data.permissions[7].m_delete,
        });
        setSandBoxModule({
          ...SandBoxModule,
          Add: result.data.permissions[8].m_add,
          Edit: result.data.permissions[8].m_edit,
          View: result.data.permissions[8].m_view,
          Delete: result.data.permissions[8].m_delete,
        });
        setBannerModule({
          ...BannerModule,
          Add: result.data.permissions[9].m_add,
          Edit: result.data.permissions[9].m_edit,
          View: result.data.permissions[9].m_view,
          Delete: result.data.permissions[9].m_delete,
        });
        setSettlementModule({
          ...SettlementModule,
          Add: result.data.permissions[10].m_add,
          Edit: result.data.permissions[10].m_edit,
          View: result.data.permissions[10].m_view,
          Delete: result.data.permissions[10].m_delete,
        });
        setActivityLogs({
          ...ActivityLogs,
          Add: result.data.permissions[11].m_add,
          Edit: result.data.permissions[11].m_edit,
          View: result.data.permissions[11].m_view,
          Delete: result.data.permissions[11].m_delete,
        });
        setContactModule({
          ...ContactModule,
          Add: result.data.permissions[12].m_add,
          Edit: result.data.permissions[12].m_edit,
          View: result.data.permissions[12].m_view,
          Delete: result.data.permissions[12].m_delete,
        });
        setCMSModule({
          ...CMSModule,
          Add: result.data.permissions[13].m_add,
          Edit: result.data.permissions[13].m_edit,
          View: result.data.permissions[13].m_view,
          Delete: result.data.permissions[13].m_delete,
        });
        setMetaModule({
          ...MetaModule,
          Add: result.data.permissions[14].m_add,
          Edit: result.data.permissions[14].m_edit,
          View: result.data.permissions[14].m_view,
          Delete: result.data.permissions[14].m_delete,
        });
        setSettingModule({
          ...SettingModule,
          Add: result.data.permissions[15].m_add,
          Edit: result.data.permissions[15].m_edit,
          View: result.data.permissions[15].m_view,
          Delete: result.data.permissions[15].m_delete,
        });
        setChangePassword({
          ...ChangePassword,
          Add: result.data.permissions[16].m_add,
          Edit: result.data.permissions[16].m_edit,
          View: result.data.permissions[16].m_view,
          Delete: result.data.permissions[16].m_delete,
        });
      } catch (error) {
        console.log(error);
        toast.error("Data not Fetched", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header title="SubAdmin Permissions" path="/subAdmin" />
      <div className="row">
        <div className="col-12">
          <div>
            <span style={{ fontSize: "18px", fontWeight: "700" }}>Name -</span>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>
              {nameData.firstname} {nameData.lastname}
            </span>
          </div>
          <div>
            <span style={{ fontSize: "18px", fontWeight: "700" }}>Email -</span>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>
              {nameData.email}
            </span>
          </div>
        </div>
      </div>
      <table className="table table-bordered my-3">
        <tbody>
          <HeadingTable heading1="Assign" heading2="Module" heading3="Action" />
          <Block
            heading="Sub Admin Module"
            // module😎
            moduleValue={module.SubAdminModule}
            moduleOnChange={moduleHandleChange}
            moduleName="SubAdminModule"
            //  Action😎
            ActionValAdd={SubAdminModule.Add}
            ActionValEdit={SubAdminModule.Edit}
            ActionValView={SubAdminModule.View}
            ActionValDelete={SubAdminModule.Delete}
            ActionOnchange={subAdminOnchange}
          />
          <Block
            heading="PG Module"
            moduleValue={module.PGModule}
            moduleOnChange={moduleHandleChange}
            moduleName="PGModule"
            // Action😎
            ActionValAdd={PGModule.Add}
            ActionValEdit={PGModule.Edit}
            ActionValView={PGModule.View}
            ActionValDelete={PGModule.Delete}
            ActionOnchange={PGOnchange}
          />
          <Block
            heading="MID Module"
            moduleValue={module.MIDModule}
            moduleOnChange={moduleHandleChange}
            moduleName="MIDModule"
            // Action😎
            ActionValAdd={MIDModule.Add}
            ActionValEdit={MIDModule.Edit}
            ActionValView={MIDModule.View}
            ActionValDelete={MIDModule.Delete}
            ActionOnchange={MIDOnchange}
          />
          <Block
            heading="Chinese Bank Module"
            moduleValue={module.ChineseBankModule}
            moduleOnChange={moduleHandleChange}
            moduleName="ChineseBankModule"
            // Action😎
            ActionValAdd={ChineseBankModule.Add}
            ActionValEdit={ChineseBankModule.Edit}
            ActionValView={ChineseBankModule.View}
            ActionValDelete={ChineseBankModule.Delete}
            ActionOnchange={ChineseBankOnchange}
          />
          <Block
            heading="BankCode BankConnect Module"
            moduleValue={module.BankCodeBankConnectModule}
            moduleOnChange={moduleHandleChange}
            moduleName="BankCodeBankConnectModule"
            // Action😎
            ActionValAdd={BankCodeBankConnectModule.Add}
            ActionValEdit={BankCodeBankConnectModule.Edit}
            ActionValView={BankCodeBankConnectModule.View}
            ActionValDelete={BankCodeBankConnectModule.Delete}
            ActionOnchange={BankCodeBankConnectOnchange}
          />
          <Block
            heading="BankCode Module"
            moduleValue={module.BankCodeModule}
            moduleOnChange={moduleHandleChange}
            moduleName="BankCodeModule"
            // Action😎
            ActionValAdd={BankCodeModule.Add}
            ActionValEdit={BankCodeModule.Edit}
            ActionValView={BankCodeModule.View}
            ActionValDelete={BankCodeModule.Delete}
            ActionOnchange={BankCodeOnchange}
          />
          <Block
            heading="Merchant Module"
            moduleValue={module.MerchantModule}
            moduleOnChange={moduleHandleChange}
            moduleName="MerchantModule"
            // Action😎
            ActionValAdd={MerchantModule.Add}
            ActionValEdit={MerchantModule.Edit}
            ActionValView={MerchantModule.View}
            ActionValDelete={MerchantModule.Delete}
            ActionOnchange={MerchantOnchange}
          />
          <Block
            heading="Transaction Module"
            moduleValue={module.TransactionModule}
            moduleOnChange={moduleHandleChange}
            moduleName="TransactionModule"
            // Action😎
            ActionValAdd={TransactionModule.Add}
            ActionValEdit={TransactionModule.Edit}
            ActionValView={TransactionModule.View}
            ActionValDelete={TransactionModule.Delete}
            ActionOnchange={TransactionOnchange}
          />
          <Block
            heading="SandBox Module"
            moduleValue={module.SandBoxModule}
            moduleOnChange={moduleHandleChange}
            moduleName="SandBoxModule"
            // Action😎
            ActionValAdd={SandBoxModule.Add}
            ActionValEdit={SandBoxModule.Edit}
            ActionValView={SandBoxModule.View}
            ActionValDelete={SandBoxModule.Delete}
            ActionOnchange={SandBoxOnchange}
          />
          <Block
            heading="Banner Module"
            moduleValue={module.BannerModule}
            moduleOnChange={moduleHandleChange}
            moduleName="BannerModule"
            // Action😎
            ActionValAdd={BannerModule.Add}
            ActionValEdit={BannerModule.Edit}
            ActionValView={BannerModule.View}
            ActionValDelete={BannerModule.Delete}
            ActionOnchange={BannerOnchange}
          />
          <Block
            heading="Settlement Module"
            moduleValue={module.SettlementModule}
            moduleOnChange={moduleHandleChange}
            moduleName="SettlementModule"
            // Action😎
            ActionValAdd={SettlementModule.Add}
            ActionValEdit={SettlementModule.Edit}
            ActionValView={SettlementModule.View}
            ActionValDelete={SettlementModule.Delete}
            ActionOnchange={SettlementOnchange}
          />
          <Block
            heading="Activity Logs"
            moduleValue={module.ActivityLogs}
            moduleOnChange={moduleHandleChange}
            moduleName="ActivityLogs"
            // Action😎
            ActionValAdd={ActivityLogs.Add}
            ActionValEdit={ActivityLogs.Edit}
            ActionValView={ActivityLogs.View}
            ActionValDelete={ActivityLogs.Delete}
            ActionOnchange={ActivityLogsOnchange}
          />
          <Block
            heading="Contact Module"
            moduleValue={module.ContactModule}
            moduleOnChange={moduleHandleChange}
            moduleName="ContactModule"
            // Action😎
            ActionValAdd={ContactModule.Add}
            ActionValEdit={ContactModule.Edit}
            ActionValView={ContactModule.View}
            ActionValDelete={ContactModule.Delete}
            ActionOnchange={ContactOnchange}
          />
          <Block
            heading="CMS Module"
            moduleValue={module.CMSModule}
            moduleOnChange={moduleHandleChange}
            moduleName="CMSModule"
            // Action😎
            ActionValAdd={CMSModule.Add}
            ActionValEdit={CMSModule.Edit}
            ActionValView={CMSModule.View}
            ActionValDelete={CMSModule.Delete}
            ActionOnchange={CMSOnchange}
          />
          <Block
            heading="Meta Module"
            moduleValue={module.MetaModule}
            moduleOnChange={moduleHandleChange}
            moduleName="MetaModule"
            // Action😎
            ActionValAdd={MetaModule.Add}
            ActionValEdit={MetaModule.Edit}
            ActionValView={MetaModule.View}
            ActionValDelete={MetaModule.Delete}
            ActionOnchange={MetaOnchange}
          />
          <Block
            heading="Setting Module"
            moduleValue={module.SettingModule}
            moduleOnChange={moduleHandleChange}
            moduleName="SettingModule"
            // Action😎
            ActionValAdd={SettingModule.Add}
            ActionValEdit={SettingModule.Edit}
            ActionValView={SettingModule.View}
            ActionValDelete={SettingModule.Delete}
            ActionOnchange={SettingOnchange}
          />
          <Block
            heading="Change Password"
            moduleValue={module.ChangePassword}
            moduleOnChange={moduleHandleChange}
            moduleName="ChangePassword"
            // Action😎
            ActionValAdd={ChangePassword.Add}
            ActionValEdit={ChangePassword.Edit}
            ActionValView={ChangePassword.View}
            ActionValDelete={ChangePassword.Delete}
            ActionOnchange={ChangePasswordOnchange}
          />
        </tbody>
      </table>
      <div className=" text-end">
        <button className="btn btn-success" onClick={hamdleSubmit}>
          Update
        </button>
      </div>
    </>
  );
}

const Block = ({
  heading,
  moduleValue,
  moduleOnChange,
  moduleName,
  // Action😎
  ActionValAdd,
  ActionValEdit,
  ActionValView,
  ActionValDelete,
  ActionOnchange,
}) => {
  return (
    <tr>
      <th scope="row" style={{ width: "40%" }}>
        {heading}
      </th>
      <th scope="row" style={{ width: "20%" }} className="text-center">
        {/* Module */}
        <input
          className="form-check-input"
          type="checkbox"
          value={moduleValue}
          checked={moduleValue === 1 ? true : false}
          name={moduleName}
          onChange={(e) => moduleOnChange(e)}
          style={{ fontSize: "20px" }}
        />
      </th>
      {/* Action */}
      <th
        scope="row"
        className="d-flex justify-content-around align-items-center"
        style={{ width: "100%" }}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={ActionValAdd}
            checked={ActionValAdd === 1 ? true : false}
            name="Add"
            onChange={(e) => ActionOnchange(e)}
            style={{ fontSize: "20px" }}
            disabled={moduleValue === 1 ? false : true}
          />
          <label className="form-check-label">Add</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={ActionValEdit}
            onChange={(e) => ActionOnchange(e)}
            checked={ActionValEdit === 1 ? true : false}
            name="Edit"
            style={{ fontSize: "20px" }}
            disabled={moduleValue === 1 ? false : true}
          />
          <label className="form-check-label">Edit</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={ActionValView}
            checked={ActionValView === 1 ? true : false}
            onChange={(e) => ActionOnchange(e)}
            name="View"
            style={{ fontSize: "20px" }}
            disabled={moduleValue === 1 ? false : true}
          />
          <label className="form-check-label">View</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={ActionValDelete}
            checked={ActionValDelete === 1 ? true : false}
            onChange={(e) => ActionOnchange(e)}
            name="Delete"
            style={{ fontSize: "20px" }}
            disabled={moduleValue === 1 ? false : true}
          />
          <label className="form-check-label">Delete </label>
        </div>
      </th>
    </tr>
  );
};

const HeadingTable = ({ heading1, heading2, heading3 }) => {
  return (
    <tr className="bg-primary">
      <th scope="row" className="text-white">
        {heading1}
      </th>
      <th
        scope="row"
        className="text-white d-flex align-items-center justify-content-center"
      >
        {heading2}
      </th>
      <th scope="row" className="text-white text-center">
        {heading3}
      </th>
    </tr>
  );
};

export default SubAdminPermission;
