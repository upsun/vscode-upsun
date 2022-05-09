#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# npm install -g vsce

rm -rf out/*
vsce package -o dist --pre-release
