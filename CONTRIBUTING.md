# Contributing

Want to contribute to this wonderful project?
Well here's some easy steps that will help us to collaborate.

## GIT Setup

 1. Go to the [Github](https://github.com/doomy23/ReactGames) and **fork the repository**
 2. Clone your fork on your desktop
 3. Open the terminal in the project and configure **upstream**:
```
git remote add upstream git@github.com:doomy23/ReactGames.git
git remote set-url --push upstream no_push
git config branch.master.remote upstream
git config branch.master.merge refs/heads/master
```
 4. Git pull from **upstream master** then create new branches as:
    - `features/nameOfFeature` : for new features
    - `fix/nameOfFix` : for bugs fixes
 5. Git commit with messages formated like :
```
Adding foo in bar
- created foo
- added foo to bar
```
 6. Create a **pull-request** on **upstream/master** or any branch you are based on.
 7. Ask a reviewer to check your PR
 8. Be collaborative and respectful =)
