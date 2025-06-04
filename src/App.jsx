import axios from "axios"
import clsx from "clsx"
import DOMPurify from "dompurify"
import { useState } from "react"
import { v4 } from "uuid"
import { twMerge } from "tailwind-merge"

const App = () => {
  const [id, setId] = useState()
  const [id2, setId2] = useState()
  const [exams, setExams] = useState(null)
  const [userAnswer, setUserAnswer] = useState({})
  const handleData = async () => {
    const response = await axios({
      method: "get",
      url: `https://jsonblob.com/api/jsonBlob/` + "1379825690286940160",
    })
    if (response.status === 200) {
      setExams(response.data.metadata[0].children)
    }
    const response2 = await axios({
      method: "get",
      url: `https://jsonblob.com/api/jsonBlob/` + "1379825506811305984",
    })
    if (response2.status === 200) {
      console.log(response2.data)
      setUserAnswer(response2.data.answers)
    }
  }
  return (
    <div className="bg-gray-100 py-6">
      <div className="m-auto rounded-md bg-white w-[1200px] min-h-screen p-8">
        {exams && exams.length > 0 ? (
          <div className="space-y-4">
            {exams.map((el, idx) => (
              <div key={el.id}>
                <span>
                  <span className="font-bold">{`Câu hỏi số ${idx + 1}: `}</span>
                  <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(el.content) }}></span>
                </span>
                <div className="flex flex-col gap-2">
                  {el.answers2?.map((item, _idx) => (
                    <span
                      className={twMerge(
                        clsx(
                          item.is_answer === 0 &&
                            typeof userAnswer === "object" &&
                            Object.values(userAnswer)?.find((i) => i?.iid === el.iid) &&
                            Object.values(userAnswer)?.find((i) => i?.iid === el.iid)?.answer[0] === _idx
                            ? "text-red-600"
                            : item.is_answer === 1
                            ? "text-green-600"
                            : "text-gray-600"
                        )
                      )}
                      key={v4()}
                    >
                      <span>{`${_idx + 1}. ${item.text}`}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <form className="flex flex-col gap-3">
            <label htmlFor="inp">Bỏ câu trả lời vào đây:</label>
            <input
              placeholder="Dán link copy kết quả elearning vào"
              className="p-2 placeholder:text-gray-500 placeholder:text-xs placeholder:italic rounded-md outline-none border min-w-[300px]"
              type="text"
              value={id2}
              id="inp"
              onChange={(e) => setId2(e.target.value)}
            />
            <label htmlFor="inp2">Bỏ đáp án vào đây:</label>
            <input
              placeholder="Dán link copy kết quả elearning vào"
              className="p-2 placeholder:text-gray-500 placeholder:text-xs placeholder:italic rounded-md outline-none border min-w-[300px]"
              type="text"
              value={id}
              id="inp2"
              onChange={(e) => setId(e.target.value)}
            />
            <button
              type="button"
              onClick={handleData}
              className="px-4 py-2 bg-blue-600 text-white font-semibold flex items-center justify-center rounded-md w-fit text-sm"
            >
              Xem kết quả
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
