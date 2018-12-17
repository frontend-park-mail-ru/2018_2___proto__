export default class QuestionManager {
    private static _instance: QuestionManager;
    private _usedQuestions: Array<QUestionInfo>;
    private _questionStorage: Array<QUestionInfo>;

    public static get Instance(): QuestionManager {
        if (this._instance == null)
            this._instance = new QuestionManager();

        return this._instance;
    }

    public get NewQuestion(): QUestionInfo {
        if(this._usedQuestions.length == 0 && this._questionStorage.length == 0) {
            console.exception("not enough questions");
            return new QUestionInfo(undefined);
        }

        if(this._usedQuestions.length != 0 && this._questionStorage.length == 0) {
            this._questionStorage = this._usedQuestions;
            this._usedQuestions = new Array<QUestionInfo>();
        }

        let index: number = Math.floor(Math.random() * this._questionStorage.length);
        let  question: QUestionInfo = this._questionStorage[index];
        
        this._questionStorage.splice(index, 1);
        this._usedQuestions.push(question);

        return question;
    }


    private constructor() {
        this._questionStorage = LoadQuestion();
        this._usedQuestions = new Array<QUestionInfo>();
    }
}


// please kill me for this
function LoadQuestion(): any {
    let questionsJSON: string = `{
        "questions": [
          {
            "text": "question1",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false"
            ]
          },
          {
            "text": "question2",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false"
            ]
          },
          {
            "text": "question3",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false"
            ]
          },
          {
            "text": "question4",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false"
            ]
          }
        ]
      }`;

    let questionInfoArray: Array<QUestionInfo> = new Array<QUestionInfo>();
    let questionsArray: Array<any> = JSON.parse(questionsJSON)["questions"];

    questionsArray.forEach(question => {
        questionInfoArray.push(new QUestionInfo(question));
    });

    return questionInfoArray;
}


class QUestionInfo {
    private _answers: Array<string>;
    private _correctAnswerIndex: number;
    private _timeToAnswer: number;
    private _text: string;

    public get Text(): string {
        return this._text;
    }

    public get TimeToAnswer(): number {
        return this._timeToAnswer;
    }

    public get AnswersCount(): number {
        return this._answers.length;
    }


    constructor(question: any) {
        this._answers = question.answers;
        this._correctAnswerIndex = question.correctAnswerIndex;
        this._timeToAnswer = question.timeToAnswer;
        this._text = question.text;
    }

    public GetAnswer(i: number): string {
        if (i < 0 || i > this.AnswersCount)
            i = 0;

        return this._answers[i];
    }

    public CheckAnswerCorrectness(answerIndex: number): boolean {
        return answerIndex == this._correctAnswerIndex;
    }
}
