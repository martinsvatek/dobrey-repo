"use client";

import { Button, Form, Input } from "@/components";
import { MESSAGE_SUCCESS } from "@/pages/api/getAnswer/getAnswer.consts";
import { ResponseData } from "@/pages/api/getAnswer/getAnswer.types";
import { ChangeEvent, FC, FormEvent, useState } from "react";

const CzechRobot: FC = () => {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuestion(event.currentTarget.value);
  };

  const onFormSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setLoading(true);

    const res = await fetch(`http://localhost:3000/api/getAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    const { answer, message } = (await res.json()) as ResponseData;

    setAnswer(answer);
    setMessage(message);
    setLoading(false);
  };

  return (
    <>
      <h1>Czech robot</h1>
      <Form onSubmit={onFormSubmitHandler}>
        <Input
          name="question"
          onChange={onInputChangeHandler}
          placeholder="Question"
          value={question}
        />
        <Button color="peach" isDisabled={!question} type="submit">
          {loading ? "Loading..." : "Get answer"}
        </Button>
      </Form>
      {!loading &&
        (message === MESSAGE_SUCCESS ? (
          <>
            <p>{message}</p>
            <p>
              <strong>{answer}</strong>
            </p>
          </>
        ) : (
          <p>{message}</p>
        ))}
    </>
  );
};

export default CzechRobot;
