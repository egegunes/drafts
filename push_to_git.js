const credential = Credential.create("GitHub blog repo", "The repo name, and its credentials");

credential.addTextField("username", "GitHub Username");
credential.addTextField('repo', 'Repo name');
credential.addPasswordField("key", "GitHub personal access token");

credential.authorize();

const githubKey = credential.getValue('key');
const githubUser = credential.getValue('username');
const repo = credential.getValue('repo');

const http = HTTP.create();
const base = 'https://api.github.com';

const uuid = draft.uuid;
const txt = draft.content;
const createdAt = draft.createdAt.toISOString();
let fn = `${uuid}.md`

if (draft.tags.includes("dream")) {
  fn = `dream-${uuid}.md`
}

if (draft.tags.includes("ledger")) {
  fn = `ledger-${uuid}.md`
}

const options = {
    url: `https://api.github.com/repos/${githubUser}/${repo}/contents/${fn}`,
    method: 'PUT',
    data: {
        message: `add ${fn} from drafts`,
        content: Base64.encode(draft.content)
    },
    headers: {
        'Authorization': `token ${githubKey}`
    }
};

var response = http.request(options);

if (response.success) {
    // yay
} else {
    console.log(response.statusCode);
    console.log(response.error);
}
