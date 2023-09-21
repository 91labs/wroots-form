import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { LoaderSpin } from "../components/Loader";
import { createJob } from "../hooks/createjob";
import skillData from "../data/skills.json";
import companyData from "../data/companies.json";
import categoryData from "../data/category.json";
import locationData from "../data/location.json";
import "react-quill/dist/quill.snow.css";
import "sweetalert2/src/sweetalert2.scss";

const Form = () => {
  const [skillSet, setSkillSet] = useState([]);
  const [companySet, setCompanySet] = useState([]);
  const [categorySet, setCategorySet] = useState([]);
  const [locationSet, setLocationSet] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedPlace, setSelectedPlace] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const { mutate, isLoading } = useMutation(createJob, {
    onSuccess: ({ data }) => { 
      console.log(data);
      const jobdata = JSON.parse(data.data.body);
      Swal.fire({
        title: "Job Posted!",
        text: "Your Job has been posted, Visit it right now!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Visit The Job Page",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = `https://job.wraeglobal.com/job?Id=${jobdata.id}`;
        }
      });
    },
    onError: () => toast.error("Some Error Occurred!"),
  });

  const [formData, setFormData] = useState({
    name: "",
    domainId: 1,
    noOfPositions: 0,
    statusId: 2,
    startDate: "",
    endDate: "",
    minExperience: 0,
    maxExperience: 0,
    minSalary: 0,
    maxSalary: 0,
    briefing: "",
    referralAmount: 0,
    categoryId: "",
    active: true,
    skillIds: [],
    companyId: "",
    hideCompanyName: false,
    locationIds: [],
  });

  useEffect(() => {
    const transformedSkillSet = skillData.map((skill) => ({
      label: skill.name,
      value: skill,
    }));

    const transformedCompanySet = companyData.map((company) => ({
      label: company.name,
      value: company,
    }));

    const transformedCategorySet = categoryData.map((cat) => ({
      label: cat.name,
      value: cat,
    }));

    const transformedLocationSet = locationData.map((loc) => ({
      label: loc.name,
      value: loc,
    }));

    setSkillSet(transformedSkillSet);

    setCompanySet(transformedCompanySet);

    setCategorySet(transformedCategorySet);

    setLocationSet(transformedLocationSet);
  }, []);

  const resetForm = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-start gap-12 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(formData);
        }}
        className="flex flex-col gap-2 w-full md:w-1/2"
      >
        <div className="mb-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Job title
          </label>
          <input
            type="text"
            value={formData.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <div>
            <label
              htmlFor="open_pos"
              className="block text-lg font-medium text-gray-900 "
            >
              Open Positions
            </label>
            <input
              type="number"
              id="open_pos"
              value={formData.noOfPositions}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Number of Positions Open"
              onChange={(e) =>
                setFormData({ ...formData, noOfPositions: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="valid_till"
              className="block text-lg font-medium text-gray-900 "
            >
              Job Valid Till
            </label>
            <input
              type="date"
              value={formData.startDate}
              id="valid_till"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  startDate: e.target.value,
                  endDate: e.target.value,
                });
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="min_exp"
              className="block text-lg font-medium text-gray-900 "
            >
              Min Exp(Years, eg: 5)
            </label>
            <input
              type="number"
              id="min_exp"
              value={formData.minExperience}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) =>
                setFormData({ ...formData, minExperience: e.target.value })
              }
              placeholder="Minimum Experience"
            />
          </div>
          <div>
            <label
              htmlFor="max_exp"
              className="block text-lg font-medium text-gray-900 "
            >
              Max Exp. (Years, eg: 7)
            </label>
            <input
              type="number"
              id="max_exp"
              value={formData.maxExperience}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) =>
                setFormData({ ...formData, maxExperience: e.target.value })
              }
              placeholder="Maximum Experience(in Years)"
              required
            />
          </div>
          <div>
            <label
              htmlFor="min_ctc"
              className="block text-lg font-medium text-gray-900 "
            >
              Min. CTC ( in Lakhs eg: 500000)
            </label>
            <input
              type="number"
              id="min_ctc"
              value={formData.minSalary}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) =>
                setFormData({ ...formData, minSalary: e.target.value })
              }
              placeholder="500000"
              required
            />
          </div>
          <div>
            <label
              htmlFor="max_ctc"
              className="block text-lg font-medium text-gray-900 "
            >
              Max. CTC( in Lakhs eg: 700000)
            </label>
            <input
              type="number"
              value={formData.maxSalary}
              id="max_ctc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) =>
                setFormData({ ...formData, maxSalary: e.target.value })
              }
              placeholder="Maximum CTC"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <div>
            <label
              htmlFor="brief"
              className="block text-lg font-medium text-gray-900 "
            >
              Briefing
            </label>
            <ReactQuill
              theme="snow"
              value={formData.briefing}
              onChange={(e) => setFormData({ ...formData, briefing: e })}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="w-full">
            <label
              htmlFor="ref_amt"
              className="block text-lg font-medium text-gray-900 "
            >
              Referral Amount
            </label>
            <input
              type="number"
              id="ref_amt"
              value={formData.referralAmount}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Referral Amt."
              onChange={(e) =>
                setFormData({ ...formData, referralAmount: e.target.value })
              }
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="category"
              className="block  text-lg font-medium text-gray-900"
            >
              Category
            </label>
            <Select
              options={categorySet}
              className="rounded-lg"
              placeholder="Select Category"
              value={selectedCategory}
              onChange={(data) => {
                const selectedValues = data.value.id;
                setSelectedCategory(data);
                setFormData({ ...formData, categoryId: selectedValues });
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="skillset"
            className="block  text-lg font-medium text-gray-900"
          >
            Skills Required
          </label>
          <Select
            options={skillSet}
            className="rounded-lg"
            placeholder="Select Skills"
            value={selectedSkills}
            onChange={(data) => {
              const selectedValues = data.map((option) => option.value.id);
              setSelectedSkills(data);
              setFormData({ ...formData, skillIds: selectedValues });
            }}
            isSearchable={true}
            isMulti
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="w-full">
            <label
              htmlFor="company"
              className="block  text-lg font-medium text-gray-900"
            >
              Company
            </label>
            <Select
              options={companySet}
              className="rounded-lg"
              placeholder="Select Company"
              value={selectedCompany}
              onChange={(data) => {
                const selectedValues = data.value.id;
                setSelectedCompany(data);
                setFormData({ ...formData, companyId: selectedValues });
              }}
              isSearchable={true}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="loc"
              className="block text-lg font-medium text-gray-900"
            >
              Location
            </label>
            <Select
              options={locationSet}
              className="rounded-lg"
              placeholder="Select Location"
              value={selectedPlace}
              onChange={(data) => {
                const selectedValues = data.map((option) => option.value.id);
                setSelectedPlace(data);
                setFormData({ ...formData, locationIds: selectedValues });
              }}
              isSearchable={true}
              isMulti
            />
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-0">
          <button
            type="submit"
            disabled={isLoading}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              {isLoading ? <LoaderSpin /> : "Submit"}
            </span>
          </button>
          <button
            onClick={resetForm}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Reset
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
