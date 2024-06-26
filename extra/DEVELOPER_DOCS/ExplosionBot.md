# Explosion-bot

Explosion-bot is a robot that can be invoked to help with running particular test commands.

## Permissions

Only maintainers have permissions to summon explosion-bot. Each of the open source repos that use explosion-bot has its own team(s) of maintainers, and only github users who are members of those teams can successfully run bot commands.

## Running robot commands

To summon the robot, write a github comment on the issue/PR you wish to test. The comment must be in the following format:

```
@explosion-bot please test_gpu
```

Some things to note:

- The `@explosion-bot please` must be the beginning of the command - you cannot add anything in front of this or else the robot won't know how to parse it. Adding anything at the end aside from the test name will also confuse the robot, so keep it simple!
- The command name (such as `test_gpu`) must be one of the tests that the bot knows how to run. The available commands are documented in the bot's [workflow config](https://github.com/explosion/spaCy/blob/master/.github/workflows/explosionbot.yml#L26) and must match exactly one of the commands listed there.
- The robot can't do multiple things at once, so if you want it to run multiple tests, you'll have to summon it with one comment per test.

### Examples

- Execute spaCy slow GPU tests with a custom thinc branch from a spaCy PR:

  ```
  @explosion-bot please test_slow_gpu --thinc-branch <branch_name>
  ```

  `branch_name` can either be a named branch, e.g: `develop`, or an unmerged PR, e.g: `refs/pull/<pr_number>/head`.

- Execute spaCy Transformers GPU tests from a spaCy PR:

  ```
  @explosion-bot please test_gpu --run-on spacy-transformers --run-on-branch master --spacy-branch current_pr
  ```

  This will launch the GPU pipeline for the `spacy-transformers` repo on its `master` branch, using the current spaCy PR's branch to build spaCy. The name of the repository passed to `--run-on` is case-sensitive, e.g: use `spaCy` instead of `spacy`.

- General info about supported commands.

  ```
  @explosion-bot please info
  ```

- Help text for a specific command
  ```
  @explosion-bot please <command> --help
  ```

## Troubleshooting

If the robot isn't responding to commands as expected, you can check its logs in the [Github Action](https://github.com/explosion/spaCy/actions/workflows/explosionbot.yml).

For each command sent to the bot, there should be a run of the `explosion-bot` workflow. In the `Install and run explosion-bot` step, towards the ends of the logs you should see info about the configuration that the bot was run with, as well as any errors that the bot encountered.
def num_tokens_from_messages(messages, model="gpt-3.5-turbo-0613"):
    """Return the number of tokens used by a list of messages."""
    try:
    encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        print("Warning: model not found. Using cl100k_base encoding.")
        encoding = tiktoken.get_encoding("cl100k_base")
    if model in {
        "gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k-0613",
        "gpt-4-0314",
        "gpt-4-32k-0314",
        "gpt-4-0613",
        "gpt-4-32k-0613",
        }:
        tokens_per_message = 3
        tokens_per_name = 1
    elif model == "gpt-3.5-turbo-0301":
        tokens_per_message = 4  # every message follows <|start|>{role/name}\n{content}<|end|>\n
        tokens_per_name = -1  # if there's a name, the role is omitted
    elif "gpt-3.5-turbo" in model:
        print("Warning: gpt-3.5-turbo may update over time. Returning num tokens assuming gpt-3.5-turbo-0613.")
        return num_tokens_from_messages(messages, model="gpt-3.5-turbo-0613")
    elif "gpt-4" in model:
        print("Warning: gpt-4 may update over time. Returning num tokens assuming gpt-4-0613.")
        return num_tokens_from_messages(messages, model="gpt-4-0613")
    else:
        raise NotImplementedError(
            f"""num_tokens_from_messages() is not implemented for model {model}. See https://github.com/openai/openai-python/blob/main/chatml.md for information on how messages are converted to tokens."""
        )
    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name":
                num_tokens += tokens_per_name
    num_tokens += 3  # every reply is primed with <|start|>assistant<|message|>
    return num_tokens