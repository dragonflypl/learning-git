var indexApp = angular.module('indexApp', []);

indexApp.controller('IndexCtrl', function ($scope) {

    $scope.cheatSheetOne =
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
        ),
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
                new Sample('git checkout -b [branch-name]', 'Creates a new branch, switches to it and updates the working directory')
            ],
            []
        )
    ];

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