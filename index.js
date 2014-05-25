var indexApp = angular.module('indexApp', ['ngSanitize']);

indexApp.controller('IndexCtrl', function ($scope) {

    $scope.resources =
        [
            "<a href='http://git-scm.com'>http://git-scm.com</a> - Windows Git client",
            "<a href='http://git-scm.com/docs'>http://git-scm.com/docs</a> - Git reference",
            '<a href="http://en.wikipedia.org/wiki/Markdown">http://en.wikipedia.org/wiki/Markdown</a> - syntax for creating readme files'
        ];

    var cheatSheetOne =
    [
        new CheatSheetInfo(
            'CREATE REPOSITORIES',
            'Start a new repository or obtain one from an existing URL',
            [
                new Sample(
                    'git init [project-name]',
                    'Creates a new local repository with the speciﬁed name'),
                new Sample(
                    'git clone [url]',
                    'Downloads a project and its entire version history'
                )
            ]
        ),
        new CheatSheetInfo(
            'CONFIGURE TOOLING',
            'Conﬁgure user information for all local repositories',
            [
                new Sample(
                    'git config --global user.name "[name]"',
                    'Sets the name you want atached to your commit transactions'
                ),
                new Sample(
                    'git config --global user.email "[email address]"',
                    'Sets the email you want atached to your commit transactions'
                ),
                new Sample(
                    'git config --list',
                    'See git configuration'
                )
            ]
        ),
        new CheatSheetInfo(
            'MAKE CHANGES',
            'Review edits and craf a commit transaction',
            [
                new Sample(
                    'git status',
                    'Lists all new or modiﬁed ﬁles to be commited. Shows difference between working copy, staging index and repository'
                ),
                new Sample(
                    'git add [file]',
                    'Adds file to staging area'
                ),
                new Sample(
                    'git add [filename] --u',
                    'Adds file(s) that are already in repo to staging area'
                ),
                new Sample(
                    'git add -A',
                    'Adds files to staging area, including new'
                ),
                new Sample(
                    'git diff',
                    'Shows file differences not yet staged'
                ),
                new Sample(
                    'git diff --staged',
                    'Shows file differences of staged files'
                ),
                new Sample(
                    'git commit -m "[descriptive message]"',
                    'Commits staged files'
                ),
                new Sample(
                    'git commit --am "[descriptive message]"',
                    'Commits with a message and automatically stage all tracked & modified files before the commit'
                )
            ],
            [
                new Hint(
                    'Git’s notion of Staging Index',
                    'set of files to be updated with next commit'
                )
            ]
        )
    ];

    var cheatSheetTwo = [
        new CheatSheetInfo(
            'GROUP CHANGES - BRANCHING',
            'Name a series of commits and combine completed efforts',
            [
                new Sample('git branch', 'Lists all local branches in the current repository & marks current branch'),
                new Sample('git branch [branch-name]', 'Creates a new branch',
                    [
                        new Hint('After branch is created', 'Creating a branch does not automatically make it active branch. After creating a branch, manual branch switching is required.')
                    ]),
                new Sample('git checkout [branch-name]', 'Switches to the specified branch and updates the working directory'),
                new Sample('git checkout -b [branch-name]', 'Creates a new branch, switches to it and updates the working directory'),
                new Sample('git branch -d [branch-name]', 'Deletes the specified branch',
                    [
                        new Hint(
                            "Git does not allow to delete a branch",
                            "By default Git does not allow to delete a branch unless it has been merged. To force it use -D."
                        )])
            ],
            []
        ),
        new CheatSheetInfo(
            'GROUP CHANGES - MERGING',
            '',
            [
                new Sample('git merge [branch]', 'Combines the specified branch’s history into the current branch'),
                new Sample(
                    'git branch --merged',
                    ' This command lists all branches that are included in current branch.'
                ),
                new Sample(
                    'git branch --no-merge',
                    ' This command lists all branches that are not included in current branch.'
                )
            ]),
        new CheatSheetInfo(
            'GROUP CHANGES - REMOTES',
            '',
            [
                new Sample('git remote add [remote-name] [repository-url]', "Add remote"),
                new Sample('git branch -a', 'List local & remote branches'),
                new Sample('git branch -r', 'list remote branches (the same as `git remote`)'),
                new Sample('git ls-remote', "Display detailed remote branch info"),
                new Sample(
                    'git push -u [remote-name] [branch-name]',
                    'Pushes [branch-name] to [remote-name]',
                    [
                        new Hint(
                            "push.default",
                            "Use `push.default` config option to specify a link between local branch and remote eg. git config --global push.default simple." +
                            "When done, `git push` will suffice to push changes")
                    ])
            ])
    ];

    $scope.cheatSheets = [cheatSheetOne, cheatSheetTwo];

    function CheatSheetInfo(name, desc, samples, hints) {
        this.name = name;
        this.desc = desc;
        this.samples = samples;
        this.hints = hints;
    }

    function Hint(name, desc) {
        this.name = name;
        this.desc = desc;
    }

    function Sample(code, desc, hints) {
        this.code = code;
        this.desc = desc;
        this.hints = hints;
    }
});