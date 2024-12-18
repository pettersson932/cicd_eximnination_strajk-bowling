import { http, HttpResponse } from "msw";

const notes = {
  notes: [
    {
      createdAt: "5/23/2024",
      id: "US0oobQukoiu8C8qmQxyM",
      note: "Min första anteckning",
      title: "Första anteckningen",
      username: "ada",
    },
    {
      createdAt: "5/23/2024",
      id: "_2FbzPa1QS9Pxjn4lvI7_",
      note: "Min andra anteckning",
      title: "Andra anteckningen",
      username: "ada",
    },
  ],
};

export const handlers = [
  http.get(
    "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/:username",
    () => {
      return HttpResponse.json(notes);
    }
  ),

  http.post(
    "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes",
    async ({ request }) => {
      const { title, note } = await request.json();

      console.log(title, note);

      if (!title || !note) {
        return HttpResponse.json({ success: false, message: "Missing data" });
      }

      return HttpResponse.json({ success: true, message: "Note created!" });
    }
  ),

  http.delete(
    "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/:id",
    ({ params }) => {
      const id = params;

      if (id === "US0oobQukoiu8C8qmQxyM") {
        return HttpResponse.json({ success: true, message: "Note deleted" });
      } else {
        return HttpResponse.json({ success: false, message: "Wrong id" });
      }
    }
  ),
];
