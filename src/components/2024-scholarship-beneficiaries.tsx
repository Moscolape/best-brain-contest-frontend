import { useCallback, useEffect, useState } from "react";
import PageWrapper from "../components/pageWrapper";
import { dipfHeader } from "../constants/assets";
import moment from "moment";
import { useAuth } from "../hooks/use-auth";

interface Beneficiary {
  beneficiaryName: string;
  codeNo: string;
  school: string;
  state: string;
  year: string;
  parentPhone: string;
  accountName: string;
  accountNo: string;
  bank: string;
  js1: string;
  js2: string;
  js3: string;
  juniorWAEC: string;
  ss1: string;
  ss2: string;
  ss3: string;
  seniorWAEC: string;
  beneficiaryCode: string;
  createdAt: string;
  updatedAt: string;
}

interface PreviousData {
  _id: string;
  beneficiaryName: string;
  codeNo: string;
  school: string;
  state: string;
  year: string;
  parentPhone: string;
  accountName: string;
  accountNo: string;
  bank: string;
  js1: string;
  js2: string;
  js3: string;
  juniorWAEC: string;
  ss1: string;
  ss2: string;
  ss3: string;
  seniorWAEC: string;
  beneficiaryCode: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface UpdateHistory {
  _id: string;
  beneficiaryCode: string;
  previousData: PreviousData;
  updatedBy: string;
  updatedAt: string; // ISO date string
  __v: number;
}

interface TableProps {
  show: boolean;
}

// API Base URL
const API_BASE_URL = "https://best-brain-contest-backend.onrender.com/api";
// const API_BASE_URL = "http://localhost:5000/api";

const BeneficiariesTable2024: React.FC<TableProps> = ({ show }) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, isUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [editingBeneficiary, setEditingBeneficiary] =
    useState<Beneficiary | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<Beneficiary>>({});
  const [updateHistory, setUpdateHistory] = useState<UpdateHistory[]>([]);
  const [updatedCode, setUpdateCode] = useState<string>("");

  // Filters & Sorting
  const [selectedState, setSelectedState] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Search State
  const [searchCode, setSearchCode] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Check if user is authenticated
  const authToken = localStorage.getItem("authToken");
  const { roleAccess } = useAuth();

  // Memoized function to prevent unnecessary re-creation
  const fetchBeneficiaries = useCallback(async () => {
    if (isSearching) return; // Prevent fetching when searching
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        perPage: "10",
        state: selectedState || "Abia",
        sortBy: sortBy || "",
        year: "2024",
      });

      const response = await fetch(
        `${API_BASE_URL}/beneficiary/getAll?${queryParams}`
      );
      if (!response.ok) throw new Error("Failed to fetch beneficiaries");

      const data = await response.json();
      setBeneficiaries(data.beneficiaries);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch beneficiaries.");
    } finally {
      setLoading(false);
    }
  }, [selectedState, sortBy, currentPage, isSearching]);

  // Fetch Single Beneficiary by Code
  const fetchBeneficiaryByCode = async () => {
    if (!searchCode) return alert("Please enter a beneficiary code.");
    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      // Split the code into parts (assuming the format is DIPF/STATE/YEAR/NUMBER)
      const parts = searchCode.split("/");

      if (parts.length !== 4) {
        throw new Error("Invalid beneficiary code format.");
      }

      // Convert the state (2nd part) to title case (e.g., ABIA -> Abia)
      parts[1] = parts[1]
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

      // Reconstruct the formatted code
      const formattedCode = parts.join("/");

      // Encode special characters before sending
      const encodedCode = encodeURIComponent(formattedCode);

      const response = await fetch(
        `${API_BASE_URL}/beneficiary/${encodedCode}`
      );

      if (!response.ok) throw new Error("Beneficiary not found");

      const data = await response.json();
      setBeneficiaries([data.beneficiary]);
      console.log(data.beneficiary);
      setTotalPages(1);
    } catch (err) {
      console.log(err);
      setError("Beneficiary not found.");
      setBeneficiaries([]);
    } finally {
      setLoading(false);
    }
  };

  // Clear Search & Reset Table
  const clearSearch = () => {
    setSearchCode("");
    setIsSearching(false);
    if (searchCode !== "") {
      fetchBeneficiaries();
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (beneficiary: Beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setUpdatedData(beneficiary);
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, [fetchBeneficiaries]);

  // Handle Input Change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Update Request
  const handleUpdate = async () => {
    if (!editingBeneficiary) return;
    isUpdating(true);

    try {
      const encodedCode = encodeURIComponent(
        editingBeneficiary.beneficiaryCode
      ); // Encode special characters

      const response = await fetch(
        `${API_BASE_URL}/beneficiary/${encodedCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update beneficiary");

      alert("Beneficiary updated successfully!");
      fetchBeneficiaries();
      setEditingBeneficiary(null);
    } catch (err) {
      console.log(err);
      isUpdating(false);
      alert("Error updating beneficiary.");
    }
  };

  const fetchUpdateHistory = async (beneficiaryCode: string) => {
    const parts = beneficiaryCode.split("/");

    setUpdateCode(beneficiaryCode);

    if (parts.length !== 4) {
      throw new Error("Invalid beneficiary code format.");
    }

    // Convert the state (2nd part) to title case (e.g., ABIA -> Abia)
    parts[1] = parts[1]
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Reconstruct the formatted code
    const formattedCode = parts.join("/");

    try {
      const encodedCode = encodeURIComponent(formattedCode);
      const response = await fetch(
        `${API_BASE_URL}/beneficiary/history/${encodedCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setUpdateHistory([]);
        throw new Error(data.message || "Failed to fetch update history");
      }

      setUpdateHistory(data.history);
      console.log(updateHistory);
    } catch (error) {
      console.error("Error fetching update history:", error);
      return null; // Return null in case of failure
    }
  };

  const Content = (
    <>
      {!show && (
        <img
          src={dipfHeader}
          alt="dipf"
          className="sm:w-1/2 w-full sm:h-30 h-20 mx-auto sm:mt-30 sm:mb-10 mb-5 block"
        />
      )}
      <div className="p-6 sm:bg-gray-100 rounded-md sm:shadow-lg max-w-5xl mx-auto font-Montserrat MB-20">
        <h2
          className="sm:text-3xl text-xl font-bold mb-4 text-center"
          data-aos="fade-left"
        >
          2024 Scholarship Beneficiaries
        </h2>

        {editingBeneficiary && (
          <div className="w-screen h-screen bg-[#00000090] flex items-center justify-center z-50 fixed top-0 left-0">
            <div className="bg-white sm:w-[65%] w-4/5 m-auto rounded-lg p-6 animate-fadeDownFast max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Edit Beneficiary
              </h3>

              <div className="space-y-4">
                <label>Beneficiary Name</label>
                <input
                  type="text"
                  name="beneficiaryName"
                  value={updatedData.beneficiaryName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />

                <label>Code No</label>
                <input
                  type="text"
                  name="codeNo"
                  value={updatedData.codeNo || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />

                <label>School</label>
                <input
                  type="text"
                  name="school"
                  value={updatedData.school || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />

                <label>Parent Phone</label>
                <input
                  type="text"
                  name="parentPhone"
                  value={updatedData.parentPhone || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />

                <label>Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={updatedData.accountName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />

                <label>Account No</label>
                <input
                  type="text"
                  name="accountNo"
                  value={updatedData.accountNo || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />

                <label>Bank</label>
                <input
                  type="text"
                  name="bank"
                  value={updatedData.bank || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />

                {/* Payment Status Fields */}
                {[
                  "js1",
                  "js2",
                  "js3",
                  "juniorWAEC",
                  "ss1",
                  "ss2",
                  "ss3",
                  "seniorWAEC",
                ].map((level) => (
                  <div key={level}>
                    <label>{level.toUpperCase()} Payment</label>
                    <select
                      name={level}
                      value={updatedData[level as keyof Beneficiary] || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="">Select Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Not Paid">Not Paid</option>
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-800"
                >
                  {updating ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditingBeneficiary(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="sm:flex flex-wrap gap-4 justify-between items-center mb-6 w-full">
          {/* Search by Beneficiary Code */}
          <div className="sm:flex flex-wrap justify-center items-center sm:gap-4">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Enter Code e.g DIPF/ANAMBRA/2024/021"
              className="p-2 border rounded-lg sm:w-[26rem] w-full"
            />
            <div className="sm:my-0 my-5 flex justify-center">
              <button
                onClick={fetchBeneficiaryByCode}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 mr-3"
              >
                Search
              </button>
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center sm:gap-4">
            {/* State Filter */}
            <select
              className="p-2 border rounded-lg mr-3"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="Abia">Abia</option>
              <option value="Anambra">Anambra</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Enugu">Enugu</option>
              <option value="Imo">Imo</option>
            </select>

            {/* Sort By Filter */}
            <select
              className="p-2 border rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="beneficiaryName">Beneficiary Name</option>
              <option value="codeNo">Code No</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="sm:w-[300%] w-[900%] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-300 text-left">
                    <th className="border p-2">S/No.</th>
                    <th className="border p-2">Beneficiary Name</th>
                    <th className="border p-2">Code No</th>
                    <th className="border p-2">School</th>
                    <th className="border p-2">State</th>
                    <th className="border p-2">Parent Phone</th>
                    <th className="border p-2">Account Name</th>
                    <th className="border p-2">Account No</th>
                    <th className="border p-2">Bank</th>
                    <th className="border p-2">JS1</th>
                    <th className="border p-2">JS2</th>
                    <th className="border p-2">JS3</th>
                    <th className="border p-2">Junior WAEC</th>
                    <th className="border p-2">SS1</th>
                    <th className="border p-2">SS2</th>
                    <th className="border p-2">SS3</th>
                    <th className="border p-2">Senior WAEC</th>
                    {authToken && show && roleAccess === "admin" && (
                      <th className="border p-2">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {beneficiaries.length > 0 ? (
                    beneficiaries.map((beneficiary, index) => (
                      <tr
                        key={index}
                        className={`text-sm border ${
                          beneficiary.createdAt !== beneficiary.updatedAt
                            ? "bg-red-100"
                            : index % 2 === 0
                            ? "bg-gray-100"
                            : "bg-gray-200"
                        }`}
                      >
                        <td className="border p-2">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        <td className="border p-2">
                          {beneficiary.beneficiaryName}
                        </td>
                        <td className="border p-2">{beneficiary.codeNo}</td>
                        <td className="border p-2">{beneficiary.school}</td>
                        <td className="border p-2">{beneficiary.state}</td>
                        <td className="border p-2">
                          {beneficiary.parentPhone}
                        </td>
                        <td className="border p-2">
                          {beneficiary.accountName}
                        </td>
                        <td className="border p-2">{beneficiary.accountNo}</td>
                        <td className="border p-2">{beneficiary.bank}</td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.js1 === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.js1}
                        </td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.js2 === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.js2}
                        </td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.js3 === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.js3}
                        </td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.juniorWAEC === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.juniorWAEC}
                        </td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.ss1 === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.ss1}
                        </td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.ss2 === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.ss2}
                        </td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.ss3 === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.ss3}
                        </td>
                        <td
                          className={`border-black border p-2 ${
                            beneficiary.seniorWAEC === "Not Paid"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {beneficiary.seniorWAEC}
                        </td>
                        {authToken && show && roleAccess === "admin" && (
                          <td className="border p-2">
                            <>
                              <button
                                onClick={() => handleEditClick(beneficiary)}
                                className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                              >
                                Edit
                              </button>
                              {beneficiary.createdAt !==
                                beneficiary.updatedAt && (
                                <button
                                  onClick={() =>
                                    fetchUpdateHistory(
                                      beneficiary.beneficiaryCode
                                    )
                                  }
                                  className="px-2 py-1 bg-gray-600 text-white rounded"
                                >
                                  View History
                                </button>
                              )}
                            </>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center text-gray-500 p-4">
                        No beneficiaries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                  currentPage === 1 && "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>

              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                  currentPage === totalPages && "opacity-50 cursor-not-allowed"
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      {updateHistory && updateHistory.length > 0 && (
        <div className="p-6 sm:bg-gray-100 rounded-md sm:shadow-lg max-w-5xl mx-auto font-Montserrat mt-10">
          <h1>
            <b>Update History for {updatedCode}</b>
          </h1>
          <br />
          <div className="overflow-x-auto">
            <table className="sm:w-[200%] w-[400%] border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-300 text-left">
                  <th className="border p-2">Beneficiary Name</th>
                  <th className="border p-2">School</th>
                  <th className="border p-2">State</th>
                  <th className="border p-2">Parent Phone</th>
                  <th className="border p-2">Account Name</th>
                  <th className="border p-2">Account No</th>
                  <th className="border p-2">Bank</th>
                  <th className="border p-2">Updated On:</th>
                </tr>
              </thead>
              <tbody>
                {updateHistory.map((beneficiary, index) => (
                  <tr
                    key={index}
                    className={`text-sm border ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <td className="border p-2">
                      {beneficiary.previousData.beneficiaryName}
                    </td>
                    <td className="border p-2">
                      {beneficiary.previousData.school}
                    </td>
                    <td className="border p-2">
                      {beneficiary.previousData.state}
                    </td>
                    <td className="border p-2">
                      {beneficiary.previousData.parentPhone}
                    </td>
                    <td className="border p-2">
                      {beneficiary.previousData.accountName}
                    </td>
                    <td className="border p-2">
                      {beneficiary.previousData.accountNo}
                    </td>
                    <td className="border p-2">
                      {beneficiary.previousData.bank}
                    </td>
                    <td className="border p-2">
                      {moment(beneficiary.previousData.updatedAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );

  return show ? Content : <PageWrapper>{Content}</PageWrapper>;
};

export default BeneficiariesTable2024;
